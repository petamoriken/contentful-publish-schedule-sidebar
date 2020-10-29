import * as React from "react";
import { render } from "react-dom";
import { DialogExtensionSDK, SidebarExtensionSDK, init, locations } from "contentful-ui-extensions-sdk";
import "./index.css";

import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";

init((sdk) => {
  if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(<Dialog sdk={sdk as DialogExtensionSDK} />, document.getElementById("root"));
  } else {
    render(<Sidebar sdk={sdk as SidebarExtensionSDK} />, document.getElementById("root"));
  }
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
