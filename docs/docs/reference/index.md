# Reference Docs

This page contains details of the various requirements for Nerdpacks that are included in the New Relic One Catalog. You can find the checklists for [adding](/add-checklist) or [updating](/update-checklist) on this site. This section augments those lists with additional descriptions and information. Throughout the verification process, expect to be referenced to this site for any concerns or requested remediation.

#### [Detailed workflow diagram of the process](workflow)

## [Overview](#overview)

Applications that are globally installable via the New Relic One Catalog must have the following characteristics:

- They have a referenced support channel via an online forum, issue tracker, email support, or all three
- They have workflows that support empty-state launch of the application *or else* function without setup and configuration
- They comply with New Relic licensing and security requirements
- They have received appropriate verification for code, documentation, and design quality

## [Project Structure](#project-structure)

[![Nerdpack structure](https://docs.newrelic.com/sites/default/files/thumbnails/image/nerdpack-file-structure.png)](https://docs.newrelic.com/docs/new-relic-one/use-new-relic-one/build-new-relic-one/new-relic-one-application-nerdpack-file-structure)

In addition to the Nerdpack structure described in [New Relic documentation](https://docs.newrelic.com/docs/new-relic-one/use-new-relic-one/build-new-relic-one/new-relic-one-application-nerdpack-file-structure), Nerdpacks in the New Relic One Catalog contain the following catalog metadata files in the `catalog` directory:

- [ ] a `config.json` [see example](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/config.json) containing the following fields:
  - [ ] `tagline` brief headline for the application, **30** characters or less
  - [ ] `repository` URL to the git repository, less than **1000** characters long
  - [ ] `details` description of the usage and utility of the application, less than **1000** characters using carriage returns for formatting and no markdown or HTML markup
  - [ ] `support` object containing:
    - [ ] `issues` **valid URL** to the repositories issues list (generally the GitHub issues tab for the repo)
    - [ ] `email` a **valid email address** of the team supporting the application (for New Relic, that generally takes the form of `opensource+<repo name>@newrelic.com`)
    - [ ] `community` URL to a support thread, forum, or website for troubleshooting and usage support
  - [ ] `whatsNew` a bulleted list of customer-facing changes in this version, less than **500** characters using carriage returns for formatting and no markdown or HTML markup

_Note: [Click here for a guide to capturing screenshots that adhere to the catalog requirements](./guides/capturing-screenshots)._


- [ ] `screenshots` directory containing at most 6 image files that each comply with the following guidance:
  - [ ] 3:2 aspect ratio
  - [ ] .png format
  - [ ] landscape orientation
  - [ ] at least 1600px wide
- [ ] `documentation.md` a markdown file  containing no HTML markup nor any markdown images ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/documentation.md))
- [ ] (optional) `additionalInfo.md` a markdown file  containing no HTML markup nor any markdown images ([example here](https://github.com/newrelic/nr1-catalog/tree/master/examples/catalog/additionalInfo.md))

## [Supported browsers](#supported-browsers)

Items in the NR1 catalog must work in all of New Relic’s [supported browsers](https://docs.newrelic.com/docs/using-new-relic/user-interface-functions/view-your-data/supported-browsers-new-relics-ui) for NR1.

## [Coding Guidelines](#coding-guidelines)

The following practices are explicitly disallowed

* Hard-coded account ids, user ids, and other identifiers that should be retrieved via the NR1 api based on the user viewing the nerdpack.
* Hard-coded API keys, access tokens, or other secure credentials

### Pinned library versions

The following libraries are pinned to specific versions and defined as externals in the webpack configuration. You will be limited to working with these versions when developing Nerdpacks. Your project must have dependencies set to these versions to ensure consistent behavior during testing, development, and running code in the catalog.

<table>
  <tr>
    <td>Name</td>
    <td>Current version</td>
  </tr>
  <tr>
    <td>react, react-dom</td>
    <td>16.6.3</td>
  </tr>
  <tr>
    <td>d3</td>
    <td>3.5.17</td>
  </tr>
</table>



## [Versioning and Changelogs](#versioning-and-changelogs)

Items in the catalog must use [semantic versioning](https://github.com/semantic-release/semantic-release). See **“What type of release should I use?”** for guidance on setting versions for a given change.

Repositories should include a changelog.md file in the repository that documents the changes in each release. This makes it easier for users, contributors, and code reviewers to see what changes have been made between each release of the project. Releases with breaking changes SHOULD provide details about what broke and what actions are needed from the user.

### What type of release should I use?

Much of the documentation around semantic versioning is focused on APIs, so it may not be clear how to apply it to Nerdpacks. Below are details about each release type and examples for how it applies to this use case. If you are not sure which type of release a change should trigger, it is safer to err on the side of a higher level release to minimize risk for your consumers.

#### Major release (X.y.z) - Incompatible API changes.

Impact on end users interacting with the Nerdpack MAY include:

- Notice of the change
- Learning new user interfaces
- Re-learning how to use old features or those features no longer exist

Examples include, but are not limited to:

- Removal of features or other functionality
- Significant changes to the look and/or feel of the Nerdpack
- Addition of large new features that will have a significant impact on end users

#### Minor release (x.Y.z) - Add functionality in a backwards-compatible manner.

Impact on end users interacting with the Nerdpack SHOULD be one of the following:

- Change is not noticeable
- Positive response to availability of new functionality without losing previous features or having to relearn how to use previously existing features

Examples include, but are not limited to:

- Smaller features and improvements that do not significantly change the look/feel of the component or require users to relearn previous interaction patterns.
- Improvements to the developer experience that do not impact users.

#### Patch release (x.y.Z) - Backwards-compatible bug fixes.

Impact on end users interacting with the Nerdpack SHOULD be one of the following:

- Don’t notice the change at all
- Positive response to a bug is fixed and nothing else has changed

Examples include, but are not limited to:

- Style changes that fix bugs without changing the look/feel of the Nerdpack (e.g. cross-browser bugs, fix small pixel inconsistencies with design guidelines)
- Small, relatively safe bug fixes that do not change the user experience.
- Documentation improvements

## [Code style](#code-style)

We recommend the use of this [New Relic open source eslint plugin](https://github.com/newrelic/eslint-plugin-newrelic) for implementing code formatting, but the requirement of implementing `eslint-fix` and `eslint-check` commands in your `package.json` don't mandate that plugin as the solution.

However, if you wish to leverage the [New Relic open source eslint plugin](https://github.com/newrelic/eslint-plugin-newrelic) for code formatting, execute the following commands in your project:

- Execute this command within your repo `npm install --save-dev @newrelic/eslint-plugin-newrelic eslint prettier`
- Copy these example [.eslintrc.js](https://github.com/newrelic/nr1-catalog/tree/master/examples/.eslintrc.js) and [.prettierrc.js](https://github.com/newrelic/nr1-catalog/tree/master/examples/.prettierrc.js) files into the root of your repo
- Add the following commands to the `scripts` portion of your `package.json`

```js
  "scripts": {
    "eslint-check": "eslint nerdlets/ component/",
    "eslint-fix": "eslint nerdlets/ component/ --fix"
    // other commands
  },
```

## [React Best Practices](#react-best-practices)

Projects must be developed using the current required version of React (**16.6.3**) and follow the API guidelines and general best practices for that version of React ([see docs](https://5c11762d4be4d10008916ab1--reactjs.netlify.com/docs/getting-started.html)). Below are some examples based on common issues we have hit in code reviews.

- Be careful when wrapping the entire Nerdlet in a Context consumer (i.e. `PlatformStateContext` or `NerdletStateContext`) because it can lead to unnecessary re-rendering and degrade performance of the application.
- Do not use `await` with React’s `setState` method, because it is not supported by the api and can lead to unexpected behavior and bugs as well as a reliance or expectation that `this.state` will be updated because you’ve used `await`.
- Do not rely on `setState` changes to immediately reflect in `this.state`, because although it is a synchronous function call, the state changes are not applied to `this.state` synchronously, they are queued and batch applied.
- Do utilize the `prevState` form or 2nd argument callback of `setState` for use-cases where you need guaranteed access to `prevState` or the newly updated `state`.
- Do not make imperative data fetching api calls (i.e. `NerdGraphQuery.query`) in the `render` method, this leads to significant performance issues.
- Do use declarative data fetching components or use imperative calls in the React component lifecycle methods. Mutations are acceptable. *Short rule: Queries declarative (i.e. `<AccountsQuery>` at `render` method), mutations imperative (i.e. `UserStorageMutation.mutate(...)` on your `onClick`).*
- In general, extend from `PureComponent` rather than `Component`, since it provides out-of-the-box shallow comparison, and will only re-render if a prop or state item changes.
- If you extend `Component`, you MUST implement `shouldComponentUpdate`.


## [NerdStorage](#nerdstorage)

Items in the NR1 catalog may use NerdStorage if their storage needs meet the following requirements:

* Relatively small (see [limits in the NerdStorage documentation](https://developer.newrelic.com/build-tools/new-relic-one-applications/nerdstorage)).
* Aligns with guidance specific to the type of data being stored (see table below).
* Works well with the scoping available in NerdStorage (user, account, or entity).
* Data is unlikely to require structured migrations in the future.

Guidance for usage of NerdStorage varies based on the type of data you plan to store. Consult the table below for guidance about specific data types.

<table>
  <tr>
    <td>Type of data</td>
    <td>Guidance</td>
  </tr>
  <tr>
    <td>New Relic credentials (e.g. API keys)</td>
    <td>New Relic credentials MUST NOT be stored in NerdStorage. Instead, NerdGraph should be used to access New Relic data.</td>
  </tr>
  <tr>
    <td>Credentials for other SaaS platforms (e.g. API keys, tokens)</td>
    <td>Third-party SaaS credentials MUST NOT be stored in NerdStorage UNLESS a warning about the lack of encryption at rest and possibility of access by NR employees is prominently displayed, such as in the GitHub README (example) and/or in documentation portion of the the Catalog UI.</td>
  </tr>
  <tr>
    <td>Personal Data</td>
    <td>Personal Data MUST NOT be stored in NerdStorage</td>
  </tr>
  <tr>
    <td>Other data not specified	</td>
    <td>You MAY store types of data not otherwise specified in NerdStorage.</td>
  </tr>
</table>

## [Testing](#testing)

We're working to develop a standard around code coverage and testing frameworks. Look for this to be a required component, verified by tooling in the future.

## [Security Requirements](#security-requirements)

* A Pull Request must pass an automated security scan of the code and referenced libraries to be accepted.
* The following practices are explicitly disallowed:
    * The inclusion of additional SCRIPT tags
    * Use of the *eval* command, the use of Function as a constructor (i.e. new Function(...))
    * Be extremely careful when using dangerouslySetInnerHTML in React. In general, avoid it if you don’t have a solid reason for using it.

* Code that appears to behave dangerously or in a manner different than documented in the README should be escalated to the Security team during code verification. Examples include:
    * Writing an unspecified object of data to NerdStorage
    * Interacting with an outside URL w/o clear documentation around what is being retrieved
    * Writing data to an outside source

## [Legal Requirements](#legal-requirements)

* The Nerdpack and it’s dependencies must but licensed under a permissive license such as Apache, MIT, BSD or similar license.

* No code that leverages [viral license](https://en.wikipedia.org/wiki/Viral_license) projects will be accepted for inclusion in the Catalog. Only use permissively licensed open source packages unless given explicit exception.

## [Design Requirements](#design-requirements)

The following practices are explicitly disallowed

* You MUST NOT override / amend core NR1 styles

## [Design Guidelines](#design-guidelines)

* Nerdpack developers SHOULD attempt to make use of the [NR1 visual components](https://developer.newrelic.com/client-side-sdk/index.html#components/BlockText) whenever possible. Usage of third party visual libraries is allowed, but they may not be able to take advantage of ongoing platform improvements and features.

## [Package Naming](#package-naming)

* Projects SHOULD NOT include the word *New Relic *or *newrelic* in package name or title.
* Projects SHOULD be named with human-readable, functionally descriptive names.
* Project names MUST be unique within the catalog to support the internal project mapping of submodules to uuid’s.
* Project names SHOULD use title case (e.g. "Deployment Analyzer", not “Deployment analyzer”).
* Profanity or crude language is disallowed.

## [Documentation Guidelines](#documentation-guidelines)

* Nerdpack developers MUST provide the following metadata for each version of their application
    * tagline for the application (at most 30 characters)
    * source repository URL (at most 1,000 characters)
    * application details (at most 1,000 characters)
    * semantic Version number (e.g. 1.1.0)
    * description of what’s new in the current version (at most 500 characters)
    * At least one of the following support channels:
        * Email (must be a valid email address)
        * Issues (URL)
        * Community (URL)
    * Icon (must be a .png with dimensions 48x48)

* Nerdpack developers SHOULD also provide the following metadata for each version of their application
    * Screenshots
        * At most 6
        * 3:2 aspect ratio
        * .png
        * Landscape
        * At least 1600px wide
        * At least 72ppi
    * Documentation file (in Markdown; images and raw HTML not allowed)
    * Additional information (in Markdown; images and raw HTML not allowed)

Your repository must include a README.md file that provides instructions making it easy for a code reviewer or contributor to:

* Understand what the project does
* Clone and set up the code (including installing dependencies) for local review
* Run tests
* Run the nerdpack locally
