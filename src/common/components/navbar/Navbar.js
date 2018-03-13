import React, { Component } from "react";
import { withRouter } from "react-router-3";

import "./Navbar.less";
import CharacterBar from "./character-bar/CharacterBar";
import NavbarItem from "./NavbarItem";
import VendorNavbarItem from "./VendorNavbarItem";

class Navbar extends Component {
	render() {
		return (
			<div className="navbar">
				<CharacterBar />

				<div className="menu">
					<NavbarItem route="">
						<i className="ra ra-sword" />
					</NavbarItem>
					<NavbarItem route="/quest">
						<i className="ra ra-trophy" />
					</NavbarItem>
					<VendorNavbarItem />
					<NavbarItem route="/settings">
						<i className="fa fa-cogs" />
					</NavbarItem>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
