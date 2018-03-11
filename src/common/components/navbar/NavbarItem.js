import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";
import classNames from "classnames";

import Utils from "common/Utils";

const NavbarItem = ({ item, routes, router, route, children, cssClass }) => {
	const className = classNames("navbar-item", { active: Utils.getCurrentRoute(routes) === route }, { [cssClass]: cssClass });

	return (
		<button type="button" className={className} onClick={() => router.push(route)}>
			{children}
		</button>
	);
};

NavbarItem.defaultProps = {
	cssClass: null,
	children: null
};

NavbarItem.propTypes = {
	cssClass: PropTypes.string,
	route: PropTypes.string.isRequired,
	routes: PropTypes.array.isRequired,
	router: PropTypes.object.isRequired,
	children: PropTypes.any
};

export default withRouter(NavbarItem);
