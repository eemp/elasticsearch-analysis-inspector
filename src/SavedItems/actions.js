export const ADD_SAVEDITEM = 'savedItems/add';
export const REMOVE_SAVEDITEM = 'savedItems/remove';

export function addSavedItem(name) {
  return action(ADD_SAVEDITEM, { name, location: `${window.location.pathname}${window.location.search}` });
}

export function removeSavedItem(name) {
  return action(REMOVE_SAVEDITEM, { name });
}

function action(type, payload) {
  return { type, payload };
}
