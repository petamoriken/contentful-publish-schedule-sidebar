import * as React from "react";
import { Button } from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "contentful-ui-extensions-sdk";
import "@contentful/forma-36-react-components/dist/styles.css";

const Sidebar: React.FC<{
  sdk: SidebarExtensionSDK;
}> = ({ sdk }) => {
  React.useLayoutEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk]);

  const handleButtonClicked = React.useCallback(async () => {
    const result = await sdk.dialogs.openExtension({
      width: 800,
      title: "The same extension rendered in modal window",
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

export default Sidebar;
