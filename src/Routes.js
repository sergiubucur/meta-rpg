import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router-3";

import App from "./App";
import InventoryScreen from "views/inventory-screen/InventoryScreen";
import QuestLogScreen from "views/quest-log-screen/QuestLogScreen";
import VendorScreen from "views/vendor-screen/VendorScreen";

const Routes = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={InventoryScreen} />

				<Route path="quest-log" component={QuestLogScreen} />
				<Route path="vendor" component={VendorScreen} />
			</Route>
		</Router>
	);
};

export default Routes;
