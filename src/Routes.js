import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router-3";

import App from "./App";
import InventoryScreen from "views/inventory-screen/InventoryScreen";
import DungeonRunScreen from "views/dungeon-run-screen/DungeonRunScreen";
import VendorScreen from "views/vendor-screen/VendorScreen";

const Routes = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={InventoryScreen} />

				<Route path="dungeon-run" component={DungeonRunScreen} />
				<Route path="vendor" component={VendorScreen} />
			</Route>
		</Router>
	);
};

export default Routes;
