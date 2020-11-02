/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { cleanup, configure, fireEvent, render } from "@testing-library/react";
import Dialog from "./Dialog";

configure({ testIdAttribute: "data-test-id" });

describe("Dialog", () => {
  afterEach(cleanup);

  it("closes with accept", () => {
    const dateString = new Date().toISOString();

    const sdk: any = {
      parameters: { invocation: { publishedAt: dateString } },
      close: jest.fn(),
    };
    const { getByTestId } = render(<Dialog sdk={sdk} />);

    fireEvent.click(getByTestId("accept-button-dialog"));
    expect(sdk.close).toHaveBeenCalledWith("accept");
  });

  it("closes with cancel", () => {
    const dateString = new Date().toISOString();

    const sdk: any = {
      parameters: { invocation: { publishedAt: dateString } },
      close: jest.fn(),
    };
    const { getByTestId } = render(<Dialog sdk={sdk} />);

    fireEvent.click(getByTestId("cancel-button-dialog"));
    expect(sdk.close).toHaveBeenCalledWith("cancel");
  });
});
