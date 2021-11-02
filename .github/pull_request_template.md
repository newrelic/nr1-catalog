## PR checklist to add a new application to the New Relic One Catalog

## [Nerdpack Approver](#nerdpack-approver)

- Provide the **GitHub handle** for the final Approver of this Nerdpack in your Pull Request. _Note: this is the person who will need to provide explicit sign off for the change ahead of deployment._
- If known, what is the requested date for the deployment of this functionality? _Note: this information is regarded as a courtesy. Neither New Relic nor the **nr1-catalog maintainer team** are under any obligation to meet this request. It simply provides a useful target for completion._

### [Functional Changes](#functional-changes)

List the functional changes in the pull request, highlighting the major features of the application.

- Major feature #1
- Major feature #2

_Note: The rest of this template is a checklist and guide for ensuring that your pull request is swiftly and consistently approved._

## [Project Naming Guidance](#project-naming-guidance)

- [ ] Repo names and titles must not include the word `New Relic` or `newrelic`
- [ ] Repo names and titles should be named with human-readable, functionally descriptive names
- [ ] Repo names must be unique within the `nr1-catalog` repository to support the internal project mapping of submodules to uuid’s
- [ ] Project titles should use title case (e.g. “Deployment Analyzer”, not “Deployment analyzer”)
- [ ] Projects must not include profanity or crude language in titles, repo names, or any documentation

## [Basic Nerdpack Validation](#basic-nerdpack-validation)

Validate that the following are present in your PR ahead of submitting:

- [ ] Your application has been added as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) to the nr1-catalog repo under the `apps` directory (i.e. `nr1-catalog/apps/YOUR_REPO` with an entry in the `.gitmodules` file)

**If adding a submodule**

```bash
# Assumed forked and cloned nr1-catalog repo
cd nr1-catalog/apps
git submodule add [YOUR REPO URL]
# example: git submodule add https://github.com/newrelic/nr1-browser-analyzer.git
git commit -a -m "feat: Adding [YOUR REPO NAME] to nr1-catalog."
```

**If updating a submodule to the latest commit**

```bash
# Assumed forked and cloned nr1-catalog repo
cd nr1-catalog/apps/[YOU REPO NAME]
git pull
cd ..
git commit -a -m "feat: Updating [YOUR REPO NAME] to v. [YOUR REPO VERSION]."
```

- [ ] No other code in the `nr1-catalog` repo has been modified by your PR
- [ ] the project contains only one Nerdpack with as many artifacts (launchers, nerdlets, etc.) as you choose

### [Features and Roadmap](#features-and-roadmap)

- [ ] Does this application have a workflow and/or documentation within the UI for managing an empty state?

## [Repository setup](#repository-setup)

Your linked submodule repository must contain:

- [ ] an `nr1.json` file in the root of your project [example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/nr1.json) containing the following fields:
  - [ ] `schemaType` with a value of `NERDPACK`
  - [ ] `id` containing a uuid set by the nr1 CLI (i.e. `nr1 nerdpack:uuid -gf`)
  - [ ] `displayName` containing the displayed name of the Nerdpack in the New Relic One Catalog (ex. `Browser Analyzer`)
  - [ ] `description` containing the short description of the application's functionality
- [ ] `icon.png` in the root of your project with the dimensions of **48x48**
- [ ] a `package.json` ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/package.json)) that contains:
  - [ ] a `version` that follows [semantic versioning standards](website.link)
  - [ ] a `scripts.eslint-check` command
  - [ ] a `scripts.eslint-fix` command
- [ ] a valid `LICENSE` file containing an approved permissive license (ex. Apache 2, MIT, BSD) ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/LICENSE))

_Note: we do not permit projects that contain **any** [viral licensing](https://en.wikipedia.org/wiki/Viral_license) into the New Relic One Catalog._

### [Catalog Metadata](#catalog-metadata)

Your project must contain a `catalog` directory with the following:

- [ ] a `config.json` [see example](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/config.json) containing the following fields:
  - [ ] `tagline` brief headline for the application, **30** characters or less
  - [ ] `repository` URL to the git repository, less than **1000** characters long
  - [ ] `details` description of the usage and utility of the application, less than **1000** characters using carriage returns for formatting and no markdown or HTML markup
  - [ ] `support` object containing:
    - [ ] `issues` **valid URL** to the repositories issues list (generally the GitHub issues tab for the repo)
    - [ ] `email` a **valid email address** of the team supporting the application (for New Relic, that generally takes the form of `opensource+<repo name>@newrelic.com`)
    - [ ] `community` URL to a support thread, forum, or website for troubleshooting and usage support
  - [ ] `whatsNew` a bulleted list of customer-facing changes in this version, less than **500** characters using carriage returns for formatting and no markdown or HTML markup,
  - [ ] `categoryTerms` a list of terms that matches the Nerdpack to a category in the Instant Observability catalog. A mapping of accepted terms for categories can be found by querying Nerdgraph [US](https://api.newrelic.com/graphiql?#query=%7B%0A%20%20actor%20%7B%0A%20%20%20%20nr1Catalog%20%7B%0A%20%20%20%20%20%20categories%20%7B%0A%20%20%20%20%20%20%20%20displayName%0A%20%20%20%20%20%20%20%20terms%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A) | [EU](https://api.eu.newrelic.com/graphiql?#query=%7B%0A%20%20actor%20%7B%0A%20%20%20%20nr1Catalog%20%7B%0A%20%20%20%20%20%20categories%20%7B%0A%20%20%20%20%20%20%20%20displayName%0A%20%20%20%20%20%20%20%20terms%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A)
  - [ ] `keywords` a list of relevant words to help the search discoverability of the Nerdpack, cannot exceed **50** words, each word cannot exceed **64** characters

_Note: [Click here for a guide to capturing screenshots that adhere to the catalog requirements](./guides/capturing-screenshots)._

- [ ] `screenshots` directory containing at most 6 image files that each comply with the following guidance:
  - [ ] 3:2 aspect ratio
  - [ ] .png format
  - [ ] landscape orientation
  - [ ] at least 1600px wide
- [ ] `documentation.md` a markdown file containing no HTML markup nor any markdown images ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/documentation.md))
- [ ] (optional) `additionalInfo.md` a markdown file containing no HTML markup nor any markdown images ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/additionalInfo.md))

## [Code Guidance](#code-guidance)

_The following are meant to highlight the types of common issues that can degraded performance for your application._

- [ ] The code does not violate the pinned versions of libraries for `react` and `react-dom` of **16.6.3** and `d3` of **3.5.17**
- [ ] The code does not contain hard-coded New Relic account ids, user ids, or other identifiers that should be retrieved via the NR1 API based on the user viewing the nerdpack
- [ ] The code makes efficient use of the `PlatformStateContext` and `NerdletStateContext` (i.e. not wrapping the entire Nerdlet in a state context when it's not necessary)
- [ ] The code avoids the use of `await` with React's `setState` method
- [ ] The code handles the asynchronous nature of `setState` updates
- [ ] The code does not perform imperative data fetching (ex. `NerdGraphQuery.query`) in the `render` method
- [ ] Whenever appropriate, the code's React components extend `React.PureComponent` vs. `React.Component`
- [ ] The code's React components that do extend `React.Component` implement the `shouldComponentUpdate` React lifecycle method

### [Design Guidance](#design-guidance)

- [ ] The code does not override or amend core NR1 styles

### [Security Guidance](#security-guidance)

- [ ] The code does not contain hard-coded API keys, access tokens, or other security credentials
- [ ] The code does not include additional `SCRIPT` tags
- [ ] The code avoids the use of the `eval` command
- [ ] The code avoids the use of `Function` as a constructor (i.e. `new Function(...)`)
- [ ] The code avoids the use of `dangerouslySetInnerHTML` in React
- [ ] The code does not write data to an outside source
- [ ] The code does not interact with an outside URL without clear documentation on what is being retrieved
- [ ] The code does not write unspecified object data to `NerdStorage`

### [NerdStorage Guidance](#nerdstorage-guidance)

Where appropriate, the code follows the guidance regarding [NerdStorage limits and usage](https://developer.newrelic.com/build-tools/new-relic-one-applications/nerdstorage)

- [ ] The code does not store New Relic credentials in `NerdStorage` (GraphQL should be used to access New Relic data)
- [ ] The code does not store third-party SaaS credentials in `NerdStorage` **UNLESS** a warning about the lack of encryption at rest and possibility of access by New Relic employees is prominently displayed, such as in the GitHub README ([example here](https://github.com/newrelic/nr1-github/blob/master/README.md#using-github-personal-access-tokens)) and/or in documentation portion of the New Relic One Catalog documentation ([example here](https://github.com/newrelic/nr1-github/blob/master/catalog/documentation.md#using-github-personal-access-tokens))
- [ ] The code does not store personal data ([PII](https://www.gdpreu.org/the-regulation/key-concepts/personal-data/)) in `NerdStorage`

## [New Relic only](#new-relic-only)

_Note: These concluding sections of instruction are for projects submitted by New Relic teams. If that doesn't apply to you, ignore this section in your PR._

- [ ] a standard `CONTRIBUTING.md` file in the root of the project ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/CONTRIBUTING.md))
- [ ] a standard `CODE_OF_CONDUCT.md` file in the root of the project ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/CODE_OF_CONDUCT.md))
- [ ] a standard `cla.md` file in the root of the project ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/cla.md))
- [ ] a `README.md` that contains:
  - [ ] the [`New Relic One Catalog`](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#nr1-catalog) project header at the top of the file
  - [ ] Description what the project does
  - [ ] Explains cloning and setup of the code(including installing dependencies) for local development
  - [ ] How run the nerdpack locally
- [ ] your project makes use of New Relic's open source [eslint configuration](https://github.com/newrelic/eslint-plugin-newrelic) by including the following:
  - [ ] include the appropriate development dependencies by running `npm install --save-dev @newrelic/eslint-plugin-newrelic eslint prettier` ([see example](https://github.com/newrelic/nr1-catalog/tree/master/examples/package.json))
  - [ ] include the `.eslintrc.js` configuration in the root of your project [example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/.eslintrc.js)
  - [ ] include the `.prettierrc.js` configuration in the root of your project [example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/.prettierrc.js)

### Additional Code Guidance for New Relic

_Note: this is for New Relic projects only._

- [ ] JavaScript in your nerdpack must use ES6
- [ ] The code should make use of the NR1 components. Whenever possible, the code should avoid using an external OSS component in favor of highlighting the NR1 SDK's capabilities
- [ ] The code should make use of the NR1 `Stack` and `Grid` components for layout, as these components respect spacing automatically (Note that CSS flexbox and grid are more complex than what they seem at first and sometimes they’re a bit tricky to get exact results.)
