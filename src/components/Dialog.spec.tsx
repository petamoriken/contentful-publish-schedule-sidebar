/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { cleanup, configure, fireEvent, render } from "@testing-library/react";
import Dialog from "./Dialog";

configure({ testIdAttribute: "data-test-id" });

describe("Dialog", () => {
  afterEach(cleanup);

  it("renders button", () => {
    const sdk: any = { close: jest.fn() };
    const { getByTestId } = render(<Dialog sdk={sdk} />);

    fireEvent.click(getByTestId("close-dialog"));
    expect(sdk.close).toHaveBeenCalledWith("data from modal dialog");
  });
});
