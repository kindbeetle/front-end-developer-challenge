/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./app/App";
import { name as appName } from "./app.json";

YellowBox.ignoreWarnings(["componentWillMount is deprecated and will be removed in the next major version"]); // StentConnect warning

AppRegistry.registerComponent(appName, () => App);
