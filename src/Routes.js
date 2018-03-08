import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router-3";

import App from "./App";
import Dashboard from "views/dashboard/Dashboard";

const Routes = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Dashboard} />
			</Route>
		</Router>
	);
};

export default Routes;
