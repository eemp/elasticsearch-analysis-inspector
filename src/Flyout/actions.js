export const CLOSE_FLYOUT = 'flyout/close';
export const HIDE_LOADING = 'flyout/hide_loading';
export const OPEN_FLYOUT = 'flyout/open';
export const SET_CONTENT = 'flyout/set_content';
export const SHOW_LOADING = 'flyout/show_loading';

export function openFlyout(params) {
  return dispatch => {
    dispatch(action(OPEN_FLYOUT));
    dispatch(action(SHOW_LOADING));
    return getFlyoutContent(params).then(content => {
      dispatch(action(SET_CONTENT, content));
      dispatch(action(HIDE_LOADING));
    }).catch(err => {
      console.warn('Unable to fetch flyout content.');
    });
  };
}

export function closeFlyout() {
  return action(CLOSE_FLYOUT);
}

export function showLoading() {
  return action(SHOW_LOADING);
}

export function hideLoading() {
  return action(HIDE_LOADING);
}

function action(type, payload) {
  return { type, payload };
}

function getFlyoutContent(params) {
  const { content } = params;

  return Promise.resolve(content);
}
