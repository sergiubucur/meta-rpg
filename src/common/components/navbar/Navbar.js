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
					<NavbarItem route="">
						<i className="ra ra-sword" />
					</NavbarItem>
					<NavbarItem route="/quest-log">
						<i className="ra ra-trophy" />
					</NavbarItem>
					<NavbarItem route="/vendor">
						<i className="fa fa-balance-scale" />
					</NavbarItem>
					<NavbarItem route="/settings">
						<i className="fa fa-cogs" />
					</NavbarItem>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
