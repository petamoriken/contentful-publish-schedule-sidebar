/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { cleanup, configure, fireEvent, render } from "@testing-library/react";
import Sidebar from "./Sidebar";

configure({ testIdAttribute: "data-test-id" });

describe("Sidebar", () => {
  afterEach(cleanup);

  it("render button", () => {
    const sdk: any = {
      window: { startAutoResizer: jest.fn() },
      dialogs: { openExtension: jest.fn() },
    };
    const { getByTestId } = render(<Sidebar sdk={sdk} />);

    expect(sdk.window.startAutoResizer).toHaveBeenCalled();

    fireEvent.click(getByTestId("open-dialog"));

    expect(sdk.dialogs.openExtension).toHaveBeenCalledWith({
      title: "The same extension rendered in modal window",
      width: 800,
    });
  });
});
