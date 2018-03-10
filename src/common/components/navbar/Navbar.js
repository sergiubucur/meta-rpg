import React, { Component } from "react";
import { withRouter } from "react-router-3";

import "./Navbar.less";
import NavbarItem from "./NavbarItem";

class Navbar extends Component {
	render() {
		return (
			<div className="navbar">
				<div className="status-bar">
					Level 1
				</div>
				<div className="menu">
					<NavbarItem item={{ name: "Inventory", route: "" }} />
					<NavbarItem item={{ name: "Quest Log", route: "/quest-log" }} />
					<NavbarItem item={{ name: "Vendor", route: "/vendor" }} />
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
