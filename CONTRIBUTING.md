# Contributing

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Runs the build script.
Afterwards, it will use `gh-pages` to deploy to github pages.

## Commits

Use conventional commit message formats to assist with automation of changelog notes.

## Releases

Run `npm run release -- <patch|minor|major>`.

* Bump version in package.json
* Generate an update to the changelog
* Create a new git tag corresponding to new version

Run `npm run deploy`.

* Deploy to github via [`gh-pages`](https://github.com/tschaub/gh-pages)
