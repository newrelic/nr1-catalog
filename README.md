
[![New Relic Experimental header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Experimental.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#new-relic-experimental)

# nr1-catalog

_This project is very much in development and not ready for public contribution. It's just being developed in the open._

New Relic One Catalog repo of repos. PR's to this repo  trigger the review process for either adding an New Relic One project via the NR1 CLI or to our upgrading an existing NR1 project.

## Usage

This repository is meant to be a repository of `submodules` that each represent a codebase designed to fit into the New Relic One Catalog. The repository contains three main components:

1. A collection of `submodules` each containing an New Relic One application.
2. GitHub Action automation to handle the verification of PR's and promotion of `submodules` on a merge to `master`.
3. Documentation on the standard(s) for `New Relic One Catalog` projects.

That functionality manifests in three distinct use cases.

### Use Case 1: PR with a new submodule

__Actors:__ Application Developer(s), New Relic Open Source Maintainers

When an `Application Developer` wishes to submit a new New Relic One project (application, etc.) for consideration and review, they:

- fork this repo
- add their submodule using the `git submodule add` command
- submit a PR to this project

From there, `New Relic Open Source Maintainers` will validate (using a combination of tooling and manual review):

- Project structure (does it comply with the technical requirements)
- Compliance with architectural and design standards
- Compliance with security standards
- Validation of the documentation and support standards
- Assignment of a uuid under the `global catalog account` to this repo

### Use Case 2: PR to an existing submodule

__Actors:__ Application Developer(s), New Relic Open Source Maintainers

This step verifies the same requirements as `Use Case 1`, but the review process is focused on the difference between versions.

### Use Case 3: Merge of a PR to the master Catalog

__Actor:__ New Relic Open Source Maintainers

When a `New Relic Open Source Maintainer` merges a PR to `master`, the referenced `submodule` is not only checked out, built, and associated to it's global uuid; but the following also occurs:

- the New Relic One project is `published` to the `global catalog account`,
- the New Relic One project is `deployed` to the `STABLE` channel of the `global catalog account`,
- and the catalog registry is updated with the latest meta data
