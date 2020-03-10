# Checks for the presence of files in the repository

This is a basic sanity check for files that need to be there. Will
complain if they are missing, or changed name

# Use it

Include something like this in a `file-presence.yml` file:

```yaml
name: "File presence check"
on: [pull_request, push]

jobs:
  file_presence:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: "Check file presence"
        uses: JJ/files-present-action@releases/v1
        with:
          files: "package.json, LICENSE, README.md, foo, bar"
```
