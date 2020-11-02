import * as React from "react";
import { Button, Icon, RelativeDate, Tag } from "@contentful/forma-36-react-components";
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

  const [schedule, setSchedule] = React.useState<Date | null>(null);
  const [scheduleLoaded, setScheduleLoaded] = React.useState(false);
  React.useEffect(() => {
    const entryId = sdk.entry.getSys().id;
    (async (): Promise<void> => {
      const action = (await sdk.space.getEntityScheduledActions("Entry", entryId))[0];
      if (action !== undefined) {
        setSchedule(action.scheduledFor.datetime);
      }
      setScheduleLoaded(true);
    })();
  }, [sdk]);

  const [updatedAt, setUpdatedAt] = React.useState<string | null>(null);
  const [publishedAt, setPublishedAt] = React.useState<string | null>(null);
  React.useEffect((): (() => void) => {
    return sdk.entry.onSysChanged((sys): void => {
      setUpdatedAt(sys.updatedAt || null);
      setPublishedAt(sys.publishedAt || null);
    }) as () => void;
  }, [sdk]);

  const status = React.useMemo<"published" | "scheduled" | "changed" | "draft" | null>(() => {
    if (!scheduleLoaded) {
      return null;
    }

    if (schedule !== null) {
      return "scheduled";
    } else if (publishedAt === null) {
      return "draft";
    } else if (publishedAt === updatedAt) {
      return "published";
    } else {
      return "changed";
    }
  }, [schedule, scheduleLoaded, updatedAt, publishedAt]);

  const tagType = React.useMemo<"positive" | "primary" | "secondary" | "warning" | undefined>(() => {
    switch (status) {
      case "published":
        return "positive";
      case "scheduled":
        return "secondary";
      case "changed":
        return "primary";
      case "draft":
        return "warning";
    }
  }, [status]);

  const handleButtonClicked = React.useCallback(async () => {
    const result = await sdk.dialogs.openExtension({
      width: 400,
      title: "公開スケジュール",
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
      parameters: { publishedAt: sdk.entry.fields.publishedAt.getValue() },
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
