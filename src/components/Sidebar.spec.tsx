/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { cleanup, configure, fireEvent, render } from "@testing-library/react";
import Sidebar from "./Sidebar";

configure({ testIdAttribute: "data-test-id" });

describe("Sidebar", () => {
  afterEach(cleanup);

  it("render button", () => {
    const dateString = new Date().toISOString();

    const sdk: any = {
      window: { startAutoResizer: jest.fn() },
      entry: {
        getSys: jest.fn().mockReturnValueOnce({ id: 10 }),
        onSysChanged: jest.fn(),
        fields: { publishedAt: { getValue: jest.fn().mockReturnValueOnce(dateString)  } },
      },
      space: { getEntityScheduledActions: jest.fn().mockResolvedValueOnce({ scheduledFor: { datetime: dateString } }) },
      dialogs: { openExtension: jest.fn() },
    };
    const { getByTestId } = render(<Sidebar sdk={sdk} />);

    expect(sdk.window.startAutoResizer).toHaveBeenCalled();

    // expect(sdk.entry.getSys).toHaveBeenCalled();
    // expect(sdk.space.getEntityScheduledActions).toHaveBeenCalledWith("Entry", 10);

    // expect(sdk.entry.onSysChanged).toHaveBeenCalled();

    fireEvent.click(getByTestId("open-dialog"));

    expect(sdk.entry.fields.publishedAt.getValue).toHaveBeenCalled();
    expect(sdk.dialogs.openExtension).toHaveBeenCalledWith({
      width: 400,
      title: "公開スケジュール",
      shouldCloseOnOverlayClick: true,
      shouldCloseOnEscapePress: true,
      parameters: { publishedAt: dateString },
    });
  });
});
