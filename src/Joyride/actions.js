export const STOP_JOYRIDE = 'joyride/stop';
export const RUN_JOYRIDE = 'joyride/run';

export function runJoyride() {
  return action(RUN_JOYRIDE);
}

export function stopJoyride() {
  return action(STOP_JOYRIDE);
}

function action(type, payload) {
  return { type, payload };
}

