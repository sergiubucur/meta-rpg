import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";
import classNames from "classnames";

import Utils from "common/Utils";

const NavbarItem = ({ item, routes, router }) => {
	const className = classNames("navbar-item", { active: Utils.getCurrentRoute(routes) === item.route });

	return (
		<div className={className} onClick={() => router.push(item.route)}>
			{item.name}
		</div>
	);
};

NavbarItem.propTypes = {
	item: PropTypes.object.isRequired,
	routes: PropTypes.array.isRequired,
	router: PropTypes.object.isRequired
};

export default withRouter(NavbarItem);
