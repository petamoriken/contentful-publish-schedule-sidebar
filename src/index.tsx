import * as React from 'react';
import { render } from 'react-dom';
import { Button } from '@contentful/forma-36-react-components';
import {
  init,
  locations,
  DialogExtensionSDK,
  SidebarExtensionSDK
} from 'contentful-ui-extensions-sdk';
import tokens from '@contentful/forma-36-tokens';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export const DialogExtension: React.FC<{
  sdk: DialogExtensionSDK;
}> = ({ sdk }) => {
  return (
    <div style={{ margin: tokens.spacingM }}>
      <Button
        testId="close-dialog"
        buttonType="muted"
        onClick={() => {
          sdk.close('data from modal dialog');
        }}>
        Close modal
      </Button>
    </div>
  );
};

export const SidebarExtension: React.FC<{
  sdk: SidebarExtensionSDK;
}> = ({ sdk }) => {
  React.useLayoutEffect(() => {
    sdk.window.startAutoResizer();
  }, []);

  const handleButtonClicked = React.useCallback(async () => {
    const result = await sdk.dialogs.openExtension({
      width: 800,
      title: 'The same extension rendered in modal window'
    });
    // eslint-disable-next-line no-console
    console.log(result);
  }, [sdk]);

  return (
    <Button
      testId="open-dialog"
      buttonType="positive"
      isFullWidth={true}
      onClick={handleButtonClicked}>
      Click on me to open dialog extension
    </Button>
  );
};

init(sdk => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(<DialogExtension sdk={sdk as DialogExtensionSDK} />, document.getElementById('root'));
  } else {
    render(<SidebarExtension sdk={sdk as SidebarExtensionSDK} />, document.getElementById('root'));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
