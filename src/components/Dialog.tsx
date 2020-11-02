import * as React from "react";
import { DialogExtensionSDK } from "contentful-ui-extensions-sdk";
import { Button, HelpText } from "@contentful/forma-36-react-components";
import tokens from "@contentful/forma-36-tokens";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import styled from "styled-components";
import "@contentful/forma-36-react-components/dist/styles.css";

interface Parameters {
  publishedAt: string;
}

const Content = styled.div`
  margin: ${tokens.spacingM};
`;

const Control = styled.div`
  display: flex;
  gap: ${tokens.spacingM};
  margin: ${tokens.spacingM};
`;

/**
 * 公開スケジュールを設定できるダイアログ
 * DRAFT 状態のときに表示される
 */
const Dialog: React.FC<{
  sdk: DialogExtensionSDK;
}> = ({ sdk }) => {
  const publishedAtText = React.useMemo(() => {
    const invocation = sdk.parameters.invocation as Parameters;
    const publishedAt = invocation.publishedAt;
    return dayjs(publishedAt).locale("ja").format("YYYY年MM月DD日 h:mm");
  }, [sdk]);

  return (
    <React.Fragment>
      <Content>
        <HelpText>
          {publishedAtText}に公開しますか？
        </HelpText>
      </Content>
      <Control>
        <Button
          testId="accept-button-dialog"
          buttonType="primary"
          onClick={(): void => {
            sdk.close("accept");
          }}>
          スケジュールする
        </Button>
        <Button
          testId="cancel-button-dialog"
          buttonType="muted"
          onClick={(): void => {
            sdk.close("cancel");
          }}>
          キャンセル
        </Button>
      </Control>
    </React.Fragment>
  );
};

export default Dialog;
