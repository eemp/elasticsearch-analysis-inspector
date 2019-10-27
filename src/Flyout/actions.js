export const CLOSE_FLYOUT = 'flyout/close';
export const OPEN_FLYOUT = 'flyout/open';

export function openFlyout({ content, title }) {
  return action(OPEN_FLYOUT, { content, title });
}

export function closeFlyout() {
  return action(CLOSE_FLYOUT);
}

function action(type, payload) {
  return { type, payload };
}
