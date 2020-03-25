## PR checklist to update an application already in the New Relic One Catalog

## [Nerdpack Approver](#nerdpack-approver)

- List the **GitHub handle** for the final Approver of this Nerdpack. *Note: this is the person who will need to provide explicit sign off for the change ahead of deployment.*
- What is the requested date for the deployment of this functionality? *Note: this information is regarded as a courtesy. Neither New Relic nor the **nr1-catalog maintainer team** are under any obligation to meet this request. It simply provides a useful target for completion.*

### [Functional Changes](#functional-changes)

List the functional changes in the pull request.

- Major feature #1
- Major feature #2

*Note: The rest of this template is a checklist and guide for ensuring that your pull request is swiftly and consistently approved.*

## [Basic Nerdpack Validation](#basic-nerdpack-validation)

Validate that the following are present in your PR ahead of submitting:

- [ ] Your application's submodule commit reference (SHA-hash value) has been updated to the value you expect (validate via `git submodule status`)
- [ ] No other code in the `nr1-catalog` repo has been modified by your PR
- [ ] the project contains only one Nerdpack with as many artifacts (launchers, nerdlets, etc.) as you choose
- [ ] No changes have been made in the repo name or title
- [ ] Your linked submodule repository contains an updated semantic version number
- [ ] Your linked submodule repository contains updated `whatsNew` field in `catalog/config.json`
- [ ] (if appropriate) Your linked submodule repository contains updated catalog documentation and screenshots

## [Code Review Guidance](#code-review-guidance)

*The following are meant to highlight the types of common issues that can degraded performance for your application.*

- [ ] The code does not violate the pinned versions of libraries for `react` and `react-dom` of **16.6.3** and `d3` of **3.5.17**
- [ ] The code does not contain hard-coded New Relic account ids, user ids, or other identifiers that should be retrieved via the NR1 API based on the user viewing the nerdpack
- [ ] The code makes efficient use of the `PlatformStateContext` and `NerdletStateContext` (i.e. not wrapping the entire Nerdlet in a state context when it's not necessary)
- [ ] The code avoids the use of `await` with React's `setState` method
- [ ] The code handles the asynchronous nature of `setState` updates
- [ ] The code does not perform imperative data fetching (ex. `NerdGraphQuery.query`) in the `render` method
- [ ] Whenever appropriate, the code's React components extend `React.PureComponent` vs. `React.Component`
- [ ] The code's React components that do extend `React.Component` implement the `shouldComponentUpdate` React lifecycle method

### [Design Review Guidance](#design-review-guidance)

- [ ] The code does not override or amend core NR1 styles

### [Security Review Guidance](#security-review-guidance)

- [ ] The code does not contain hard-coded API keys, access tokens, or other security credentials
- [ ] The code does not include additional `SCRIPT` tags
- [ ] The code avoids the use of the `eval` command
- [ ] The code avoids the use of `Function` as a constructor (i.e. `new Function(...)`)
- [ ] The code avoids the use of `dangerouslySetInnerHTML` in React
- [ ] The code does not write data to an outside source
- [ ] The code does not interact with an outside URL without clear documentation on what is being retrieved
- [ ] The code does not write unspecified object data to `NerdStorage`

### [NerdStorage Review Guidance](#nerdstorage-review-guidance)

Where appropriate, the code follows the guidance regarding [NerdStorage limits and usage](https://developer.newrelic.com/build-tools/new-relic-one-applications/nerdstorage)

- [ ] The code does not store New Relic credentials in `NerdStorage` (GraphQL should be used to access New Relic data)
- [ ] The code does not store third-party SaaS credentials in `NerdStorage` **UNLESS** a warning about the lack of encryption at rest and possibility of access by New Relic employees is prominently displayed, such as in the GitHub README ([example here](https://github.com/newrelic/nr1-github/blob/master/README.md#using-github-personal-access-tokens)) and/or in documentation portion of the New Relic One Catalog documentation ([example here](https://github.com/newrelic/nr1-github/blob/master/catalog/documentation.md#using-github-personal-access-tokens))
- [ ] The code does not store personal data ([PII](https://www.gdpreu.org/the-regulation/key-concepts/personal-data/)) in `NerdStorage`
