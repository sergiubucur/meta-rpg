import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";
import classNames from "classnames";

import Utils from "common/Utils";

const NavbarItem = ({ item, routes, router, route, children, cssClass, tooltip }) => {
	const active = Utils.getCurrentRoute(routes) === route;
	const className = classNames("navbar-item", { active }, { [cssClass]: cssClass });

	const handleClick = () => {
		if (!active) {
			router.push(route);
		}
	};

	return (
		<button type="button" className={className} onClick={handleClick} title={tooltip}>
			{children}
		</button>
	);
};

NavbarItem.defaultProps = {
	cssClass: null,
	children: null,
	tooltip: ""
};

NavbarItem.propTypes = {
	cssClass: PropTypes.string,
	route: PropTypes.string.isRequired,
	routes: PropTypes.array.isRequired,
	router: PropTypes.object.isRequired,
	children: PropTypes.any,
	tooltip: PropTypes.string
};

export default withRouter(NavbarItem);
