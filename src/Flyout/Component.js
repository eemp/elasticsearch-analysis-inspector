import Promise from 'bluebird';
import React from 'react';

import { EuiDelayRender, EuiFlyout, EuiFlyoutHeader, EuiFlyoutBody, EuiLoadingContent, EuiText, EuiTitle } from '@elastic/eui';

import Preferences from '../Preferences';
import Settings from '../Settings';

const flyouts = {
  Preferences,
  Settings,
};

function withFlyoutContent(FlyoutComponent) {
  class FlyoutComponentWithContent extends React.Component {
    constructor(props) {
      super(props);
      this.updateContent = this.updateContent.bind(this);
      this.state = {
        content: null,
        loading: false,
      };
    }

    componentDidMount() {
      this.updateContent();
    }

    componentDidUpdate(prevProps) {
      const { content: prevContent } = prevProps;
      const { content } = this.props;
      if(prevContent !== content) {
        this.updateContent();
      }
    }

    updateContent() {
      const { content } = this.props;
      if(!isFulfilled(content)) {
        this.setState({ loading: true });

        Promise.resolve(content).then(resolvedContent => {
          this.setState({ content: resolvedContent });
        })
        .catch(err => {
          console.warn('Encountered unexpected error resolving flyout content', err);
        })
        .then(() => this.setState({ loading: false }));
      }
      else {
        this.setState({ content });
      }
    }

    render() {
      const { content, loading } = this.state;
      return (
        <FlyoutComponent
          {...this.props}
          content={content}
          loading={loading}
        />
      );
    }
  }

  return FlyoutComponentWithContent;
}

function Flyout(props) {
  const { closeFlyout, content = null, loading, open, title = null } = props;
  const FlyoutContentComponent = flyouts[content];

  return open ? (
    <EuiFlyout onClose={closeFlyout} ownFocus>
      {
        title && (
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h3>{title}</h3>
            </EuiTitle>
          </EuiFlyoutHeader>
        )
      }
      <EuiFlyoutBody>
        {
          loading
            ? (
              <EuiDelayRender>
                <EuiLoadingContent lines={10} />
              </EuiDelayRender>
            )
            : (
              flyouts[content] ? <FlyoutContentComponent /> : (
                <EuiText>
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </EuiText>
              )
            )
        }
      </EuiFlyoutBody>
    </EuiFlyout>
  ) : null;
}

export default withFlyoutContent(Flyout);

function isFulfilled(possiblePromise) {
  return Promise.resolve(possiblePromise).isFulfilled();
}
