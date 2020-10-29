import * as React from "react";
import { DialogExtensionSDK } from "contentful-ui-extensions-sdk";
import { Button } from "@contentful/forma-36-react-components";
import tokens from "@contentful/forma-36-tokens";
import "@contentful/forma-36-react-components/dist/styles.css";

const Dialog: React.FC<{
  sdk: DialogExtensionSDK;
}> = ({ sdk }) => {
  return (
    <div style={{ margin: tokens.spacingM }}>
      <Button
        testId="close-dialog"
        buttonType="muted"
        onClick={(): void => {
          sdk.close("data from modal dialog");
        }}>
        Close modal
      </Button>
    </div>
  );
};

export default Dialog;
