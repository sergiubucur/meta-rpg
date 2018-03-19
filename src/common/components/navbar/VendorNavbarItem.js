import React, { Component } from "react";

import NavbarItem from "./NavbarItem";
import inventoryService from "common/services/InventoryService";

export default class VendorNavbarItem extends Component {
	state = {
		dropzone: false
	}

	componentDidMount() {
		this.itemDragListener = inventoryService.events.addListener("itemDrag", (type) => {
			this.setState({
				dropzone: type === "start"
			});
		});

		document.addEventListener("dragend", this.handleDocumentDragEnd, false);
	}

	componentWillUnmount() {
		inventoryService.events.removeListener("itemDrag", this.itemDragListener);
		document.removeEventListener("dragend", this.handleDocumentDragEnd);
	}

	handleDocumentDragEnd = (e) => {
		inventoryService.itemDragEnd();
	}

	handleDragOver = (e) => {
		e.preventDefault();
	}

	handleDrop = (e) => {
		e.preventDefault();

		let data = e.dataTransfer.getData("text");
		if (data) {
			data = JSON.parse(data);

			inventoryService.sellItem(data);
		}
	}

	render() {
		const { dropzone } = this.state;

		return (
			<div className="vendor-navbar-item" onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
				<NavbarItem route="/vendor" cssClass={dropzone ? "dropzone" : null} tooltip="Vendor">
					<i className="fa fa-balance-scale" />
				</NavbarItem>
			</div>
		);
	}
}
