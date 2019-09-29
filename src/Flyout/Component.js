import React from 'react';

import { EuiDelayRender, EuiFlyout, EuiFlyoutHeader, EuiFlyoutBody, EuiLoadingContent, EuiText, EuiTitle } from '@elastic/eui';

export default function Flyout(props) {
  const { closeFlyout, content = null, loading, open, title = null } = props;
  return open ? (
    <EuiFlyout onClose={closeFlyout} ownFocus>
      {
        title && (
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2>Title</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
        )
      }
      {
        loading
          ? (
            <EuiDelayRender>
              <EuiLoadingContent lines={10} />
            </EuiDelayRender>
          )
          : (
            <EuiFlyoutBody>
              <EuiText>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </EuiText>
            </EuiFlyoutBody>
          )
      }
    </EuiFlyout>
  ) : null;
}
