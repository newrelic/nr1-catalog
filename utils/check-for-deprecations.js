"use strict";
import fetch from "node-fetch";
import pRetry from "p-retry";
import fs from "fs";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";
const rawGlobalsdata = fs.readFileSync("../globals.json");
const globals = JSON.parse(rawGlobalsdata);

const pullRequestIntro =
  "## Description \nThe following apps and deprecation messages have been logged in the platform. To prevent users of these apps seeing error toasts in the platform, please make the necessary changes.\nSee for more context:\n - https://docs.google.com/document/d/1kyaxHKxVqTcyaayKK3TG6MLXvje3Uc59RqX1kC9bjE0/edit#\n - https://nerdlife.datanerd.us/new-relic/logger-improvements-834d24dc-16c0-4e64-b6a1-95c03100e779\n\n## Apps\n";
const timeframe = "1 month";
const retries = 5;
const ACCOUNT_ID = 1067061;
const queryKey = 'NRIQ-pzdsTV4tY9KlIGf5e85fFRpqa2UqYSu_';
const basePath = `https://staging-insights-api.newrelic.com/v1/accounts/${ACCOUNT_ID}/query?nrql=`;
const options = {
  headers: {
    "X-Query-Key": queryKey,
  },
};

const context = github.context;
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Stringifies an array for use in a NRQL query
 * @param {Array} arr - An array of appName strings
 * @returns {String} stringifiedArray
 */
const stringifyArrayForNrql = (arr) => {
  const stringifiedArray = Object.values(arr).reduce((acc, name) => {
    acc += ",";
    return (acc += `'${name}'`);
  }, "");

  return stringifiedArray;
};

/**
 * Fetches event data from the Insights Event API
 * @param {String} url - The url to send the request to
 * @param {Object} options - The request options
 * @returns {Object} response.json()
 */
const getData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (response.status >= 300) {
      throw new pRetry.AbortError({
        errorMessage: `Request failed after ${retries} retries`,
        statusText: response.statusText,
        status: response.status,
        retries,
        url,
      });
    }
    return response.json();
  } catch (err) {
    core.setFailed("Action failed with error:");
    core.error(JSON.stringify(err));
    return [];
  }
};

/**
 * Replaces %s in messages with an array of arguments
 * @param {Object} events - Events from API containing message and args
 * @returns {Array} An array of unique messages with args replaced
 */
const replaceMessageArgs = (events) => {
  const replacedMessages = events.map((event) => {
      const args = JSON.parse(event.args);

      let message = args.reduce((acc, arg) => {
        acc = acc.replace(/%s/, arg);
        return acc;
      }, event.message);

      return message;
    });

  const uniqueMessages = getUniqueMessages(replacedMessages);
  return uniqueMessages;
};

/**
 * Removes duplicates from an array
 * @param {Array} messages - Messages with args replaced
 * @returns {Array} An array of Unique Messages
 */
const getUniqueMessages = (messages) => {
  const uniqueMessages = messages.reduce((acc, current) => {
      const dupe = acc.find((item) => item === current);

      if (!dupe) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  return uniqueMessages;
};

/**
 * Fetches event data from the Insights Event API
 * @param {Array} data - An array of objects containing appNames and messages
 * @returns {String} pullRequestDescription
 */
const createPullRequestDescription = (data) => {
  const pullRequestDescription = data.reduce((acc, app) => {
    acc += `\n - [ ] ${app.appName}\n`;
    app.messages.forEach((message) => (acc += `      - [ ] ${message}\n`));
    return acc;
  }, "");

  return pullRequestDescription;
};

/**
 * Fetches event data from the Insights Event API for each app
 * @param {String[]} apps - Array of appNames
 * @returns {Array} deprecationMessages that aren't empty
 */
const getDeprecationMessages = async (apps) => {
  const deprecationMessages = await Promise.all(
    apps.map(async (appName) => {
      const messageQuery = `${basePath}FROM LoggerAction SELECT message, args WHERE nerdpackName = '${appName}' AND actionType = 'deprecate' SINCE ${timeframe} ago LIMIT 1000`;
      const messagesData = await pRetry(() => getData(messageQuery, options), {
        retries,
      });
      if (!messagesData.results) {
        return null;
      }
      const { events } = messagesData.results[0];
      const messages = replaceMessageArgs(events);

      return {
        appName,
        messages,
      };
    })
  );

  return deprecationMessages.filter(Boolean);
};

const main = async () => {
  const appNameArray = Object.values(globals);
  const appNameString = await stringifyArrayForNrql(appNameArray);
  const appNrqlQuery = `FROM LoggerAction SELECT uniqueCount(message) WHERE nerdpackId IN (${appNameString.substring(
    1
  )}) AND actionType = 'deprecate' FACET nerdpackName SINCE ${timeframe} ago LIMIT 1000`;

  const url = basePath + appNrqlQuery;

  const appRawData = await pRetry(() => getData(url, options), { retries });
  const appResults = appRawData.facets;

  if (!appResults) {
    return;
  } else if (appResults.length === 0) {
    core.info("No apps containing deprecation messages were found, yay :D!");
  }

  const appNames = appResults.map((app) => app.name);
  const deprecationMessages = await getDeprecationMessages(appNames);

  if (!deprecationMessages) {
    return;
  }

  const pullRequestDescription =
    createPullRequestDescription(deprecationMessages);

  try {
    const newIssue = await octokit.rest.issues.create({
      ...context.repo,
      title: "[Platform Deprecations] The following apps require updates",
      body: pullRequestIntro + pullRequestDescription,
      labels: ['deprecations']
    });
    core.info("New issue created successfully!");
  } catch (error) {
    core.setFailed("Failed to create new issue with error:");
    core.error(error);
  }
};

main();
