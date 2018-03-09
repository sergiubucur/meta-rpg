import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router-3";

import App from "./App";
import InventoryScreen from "views/inventory-screen/InventoryScreen";

const Routes = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={InventoryScreen} />
			</Route>
		</Router>
	);
};

export default Routes;
