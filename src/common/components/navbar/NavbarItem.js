import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";
import classNames from "classnames";

import Utils from "common/Utils";

const NavbarItem = ({ item, routes, router, route, children, cssClass }) => {
	const active = Utils.getCurrentRoute(routes) === route;
	const className = classNames("navbar-item", { active }, { [cssClass]: cssClass });

	const handleClick = () => {
		if (!active) {
			router.push(route);
		}
	};

	return (
		<button type="button" className={className} onClick={handleClick}>
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
