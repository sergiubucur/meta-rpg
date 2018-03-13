import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router-3";

import App from "./App";
import InventoryScreen from "views/inventory-screen/InventoryScreen";
import QuestScreen from "views/quest-screen/QuestScreen";
import VendorScreen from "views/vendor-screen/VendorScreen";
import SettingsScreen from "views/settings-screen/SettingsScreen";

const Routes = () => {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={InventoryScreen} />

				<Route path="quest" component={QuestScreen} />
				<Route path="vendor" component={VendorScreen} />
				<Route path="settings" component={SettingsScreen} />
			</Route>
		</Router>
	);
};

export default Routes;
