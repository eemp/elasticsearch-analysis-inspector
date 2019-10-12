# Contributing

## Commits

Use conventional commit message formats to assist with automation of changelog notes.

## Releases

Run `npm run release -- <patch|minor|major>`.

* Bump version in package.json
* Generate an update to the changelog
* Create a new git tag corresponding to new version

Run `npm run deploy`.

* Deploy to github via [`gh-pages`](https://github.com/tschaub/gh-pages)
