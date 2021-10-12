"use strict";
import fetch from "node-fetch";
import pRetry from "p-retry";
import fs from "fs";
import * as core from "@actions/core";
import * as github from "@actions/github";
const rawGlobalsdata = fs.readFileSync("../globals.json");
const globals = JSON.parse(rawGlobalsdata);

const timeframe = "2 months";
const retries = 5;
const ACCOUNT_ID = 1067061;
const queryKey = "NRIQ-pzdsTV4tY9KlIGf5e85fFRpqa2UqYSu_";
const basePath = `https://staging-insights-api.newrelic.com/v1/accounts/${ACCOUNT_ID}/query?nrql=`;
const options = {
  headers: {
    "X-Query-Key": queryKey,
  },
};

const myToken = core.getInput("GITHUB_TOKEN");
const octokit = github.getOctokit(myToken);
const context = github.context;

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
    console.error(err);
    return [];
  }
};

const get2Data = async (url, options) => {
  try {
    const response = await fetch(url, options);

    if (response.status <= 300) {
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
    console.error(err);
    return [];
  }
};

const replaceMessageArgs = async (events) => {
  const replacedMessages = await Promise.all(
    events.map(async (event) => {
      const args = JSON.parse(event.args);

      let message = await args.reduce((acc, arg) => {
        acc = acc.replace(/%s/, arg);
        return acc;
      }, event.message);

      return message;
    })
  );

  const uniqueMessages = await getUniqueMessages(replacedMessages);

  return uniqueMessages;
};

const getUniqueMessages = async (messages) => {
  const uniqueMessages = await Promise.all(
    messages.reduce((acc, current) => {
      const x = acc.find((item) => item === current);

      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [])
  );

  return uniqueMessages;
};

const createPullRequestDescription = (data) => {
  const pullRequestDescription = data.reduce((acc, app) => {
    acc += `\n - [ ] ${app.appName}\n`;
    app.messages.forEach((message) => (acc += `      - [ ] ${message}\n`));
    return acc;
  }, "");
  console.log(pullRequestDescription);
  return pullRequestDescription;
};

const stringifyArrayForNrql = (arr) => {
  const stringifiedArray = Object.values(arr).reduce((acc, name) => {
    acc += ",";
    return (acc += `'${name}'`);
  }, "");

  return stringifiedArray;
};

const getDeprecationMessages = async (apps) => {
  const deprecationMessages = await Promise.all(
    apps.map(async (appName) => {
      const messageQuery = `${basePath}FROM LoggerAction SELECT message, args WHERE nerdpackName = '${appName}'  SINCE ${timeframe} ago`;
      const messagesData = await pRetry(() => get2Data(messageQuery, options), {
        retries,
      });
      if (!messagesData.results) {
        return null;
      }
      const { events } = messagesData.results[0];
      const messages = await replaceMessageArgs(events);

      return {
        appName,
        messages,
      };
    })
  );
  console.log(deprecationMessages.filter(Boolean));
  return deprecationMessages.filter(Boolean);
};

const main = async () => {
  const appNameArray = Object.values(globals);
  const appNameString = await stringifyArrayForNrql(appNameArray);
  const appNrqlQuery = `FROM LoggerAction SELECT uniqueCount(message) WHERE nerdpackId IN (${appNameString.substring(
    1
  )}) FACET nerdpackName SINCE ${timeframe} ago LIMIT 1000`;

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
      title: "New issue!",
      body: "Hello Universe!",
    });
  } catch (error) {}
};

main();
