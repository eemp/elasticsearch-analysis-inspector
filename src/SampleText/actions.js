export const UPDATE_SAMPLETEXT = 'sampletext/update';

export function updateSampleText(sampleText) {
  return action(UPDATE_SAMPLETEXT, sampleText);
}

function action(type, payload) {
  return { type, payload };
}
