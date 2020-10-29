import * as React from "react";
import { Button, Tag, RelativeDate, Icon, DateTime } from "@contentful/forma-36-react-components";
import { SidebarExtensionSDK } from "contentful-ui-extensions-sdk";
import styled from "styled-components";
import "@contentful/forma-36-react-components/dist/styles.css";

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const InlineButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const More = styled.div`
  display: flex;
  margin-top: 18px;
`;

const StyledSpan = styled.span`
  font-size: 14px;
  font-family: var(--font-stack-primary);
  font-weight: normal;
  color: rgb(96, 108, 124);
`;

const Sidebar: React.FC<{
  sdk: SidebarExtensionSDK;
}> = ({ sdk }) => {
  React.useLayoutEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk]);

  const [status, setStatus] = React.useState<"draft" | "published" | "changed" | null>(null);
  const [updatedAt, setUpdatedAt] = React.useState<string | null>(null);
  React.useEffect((): (() => void) => {
    return sdk.entry.onSysChanged((sys): void => {
      if (sys.publishedAt === undefined) {
        setStatus("draft");
      } else if (sys.publishedAt === sys.updatedAt) {
        setStatus("published");
      } else {
        setStatus("changed");
      }
      if (sys.updatedAt !== undefined) {
        setUpdatedAt(sys.updatedAt);
      }
    }) as () => void;
  }, [sdk]);

  const tagType = React.useMemo<"positive" | "primary" | "warning">(() => {
    if (status === "published") {
      return "positive";
    } else if (status === "changed") {
      return "primary";
    } else {
      return "warning";
    }
  }, [status]);

  const handleButtonClicked = React.useCallback(async () => {
    const result = await sdk.dialogs.openExtension({
      width: 400,
      title: "Set Schedule",
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
    });
    // eslint-disable-next-line no-console
    console.log(result);
  }, [sdk]);

  return (
    <React.Fragment>
      <Status>
        <StyledSpan>Current</StyledSpan>
        <Tag tagType={tagType}>
          {status !== null ? status.toUpperCase() : ""}
        </Tag>
      </Status>
      <Button
        testId="open-dialog"
        buttonType="positive"
        isFullWidth={true}
        onClick={handleButtonClicked}>
          <InlineButton>
            <Icon icon="Clock" size="small" color="white" /> 公開予約
          </InlineButton>
      </Button>
      {updatedAt !== null &&
        <More>
          <StyledSpan>
            Last saved <RelativeDate date={new Date(updatedAt)} />
          </StyledSpan>
        </More>
      }
    </React.Fragment>
  );
};

export default Sidebar;
