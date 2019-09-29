import { openFlyout } from '../Flyout/actions';

export function openDocsFlyout(content) {
  return openFlyout({
    content,
  });
}
