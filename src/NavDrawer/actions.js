import _ from 'lodash';
import marked from 'marked';
import request from 'axios';
import { openFlyout } from '../Flyout/actions';
import { removeSavedItem } from '../SavedItems/actions';
import { runJoyride } from '../Joyride/actions';

function showInfo() {
  return (dispatch) => {
    dispatch(openFlyout({
      content: getInfoContent(),
    }));
  };
}

function showTutorial() {
  return (dispatch) => {
    dispatch(runJoyride());
  };
}

export {
  openFlyout,
  removeSavedItem,
  showInfo,
  showTutorial,
};

function getInfoContent() {
  return Promise.all([
    getReadmeContent(),
    getChangelogContent(),
  ]).then(combineContent);
}

function baseMarkdownURLtoHTML(sourceUrl) {
  return request.get(sourceUrl).then(response => (
    marked(response.data, { gfm: true })
  ));
}
const markdownURLtoHTML = _.memoize(baseMarkdownURLtoHTML);

function getReadmeContent() {
  const README_URL = 'https://raw.githubusercontent.com/eemp/elasticsearch-analysis-inspector/master/README.md';
  return markdownURLtoHTML(README_URL);
}

function getChangelogContent() {
  const CHANGELOG_URL = 'https://raw.githubusercontent.com/eemp/elasticsearch-analysis-inspector/master/CHANGELOG.md';
  return markdownURLtoHTML(CHANGELOG_URL);
}

function combineContent(args) {
  return _.reduce(args, (acc, arg) => acc + arg);
}
