import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";

import "./Navbar.less";
import CharacterBar from "./character-bar/CharacterBar";
import NavbarItem from "./NavbarItem";
import VendorNavbarItem from "./VendorNavbarItem";
import Utils from "common/Utils";
import questService from "common/services/QuestService";

class Navbar extends Component {
	static propTypes = {
		routes: PropTypes.array.isRequired
	}

	componentDidMount() {
		this.updateListener = questService.events.addListener("update", () => {
			const route = Utils.getCurrentRoute(this.props.routes);

			if (route === "/quest" && questService.notify) {
				questService.stopNotification();
			} else {
				this.forceUpdate();
			}
		});

		this.checkQuestNotify(this.props);
	}

	componentWillUnmount() {
		questService.events.removeListener("update", this.updateListener);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props !== nextProps) {
			this.checkQuestNotify(nextProps);
		}
	}

	checkQuestNotify(props) {
		const route = Utils.getCurrentRoute(props.routes);

		if (route === "/quest") {
			questService.stopNotification();
		}
	}

	render() {
		const questClassName = questService.notify ? "notify" : "";

		return (
			<div className="navbar">
				<CharacterBar />

				<div className="menu">
					<NavbarItem route="" tooltip="Inventory">
						<i className="ra ra-sword" />
					</NavbarItem>
					<NavbarItem route="/quest" cssClass={questClassName} tooltip="Quests">
						<i className="ra ra-trophy" />
					</NavbarItem>
					<VendorNavbarItem />
					<NavbarItem route="/help" tooltip="Help">
						<i className="fa fa-question-circle" />
					</NavbarItem>
				</div>
			</div>
		);
	}
}

export default withRouter(Navbar);
