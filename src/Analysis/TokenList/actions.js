export const SELECT_TOKENS = 'analysis/tokenlist/select';
export const UNSELECT_TOKENS = 'analysis/tokenlist/unselect';

export function selectTokens(offset) {
  return action(SELECT_TOKENS, offset);
}

export function unselectTokens() {
  return action(UNSELECT_TOKENS);
}

function action(type, payload) {
  return { type, payload };
}
