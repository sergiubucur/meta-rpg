import React, { Component } from "react";
import { withRouter } from "react-router-3";

import "./Navbar.less";
import NavbarItem from "./NavbarItem";

class Navbar extends Component {
	render() {
		return (
			<div className="navbar">
				<NavbarItem item={{ name: "Inventory", route: "" }} />
				<NavbarItem item={{ name: "Dungeon Run", route: "/dungeon-run" }} />
				<NavbarItem item={{ name: "Vendor", route: "/vendor" }} />
			</div>
		);
	}
}

export default withRouter(Navbar);
