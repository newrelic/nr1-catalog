
[![Community Project header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Community_Project.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#community-project)

# nr1-catalog

_This project is very much in development and not ready for public contribution. It's just being developed in the open._

New Relic One Catalog repo of repos. PR's to this repo  trigger the review process for either adding an NR1 project via the NR1 CLI or to our upgrading an existing NR1 project.

## Usage

This repository is meant to be a repository of `submodules` that each represent a codebase designed to fit into the Catalog. Thus the repository contains three main components:

1. A collection of `submodules` each containing an NR1 app/integration/etc.
2. GitHub Action automation to handle the verification of PR's and promotion of `submodules` on a merge to `master`.
3. Documentation on the standard(s) for `New Relic One Catalog` projects in a `gh-pages`-type site.

That functionality manifests in three distinct use cases.

### Use Case 1: PR with a new submodule

When a developer/team wishes to submit a new NR1 project (application, etc.) for consideration and review, they:

- fork this repo
- add their submodule using the `git submodule add` command
- submit a PR to this project

From there, maintainers will validate (using a combination of tooling and manual review):

- Project structure (does it comply with the technical requirements)
- Compliance with architectural and design standards
- Compliance with security standards
- Validation of the documentation and support standards
- Assignment of a uuid under the `global catalog account` to this repo (saving the uuid to a nr1-catalog-specific file store)

### Action 2: PR to an existing submodule

This step verifies the same requirements as `Use Case 1`, but the review process is focused on the difference between versions.

### Action 3: Merge of a PR to the master Catalog

When a PR is merged, the reference `submodule` is not only checked out, built, and associated to it's global uuid; the following also occurs:

- the NR1 project is `published` to the `global catalog account`,
- `deployed` to the `STABLE` channel,
- and the registry is updated with the latest meta data.
