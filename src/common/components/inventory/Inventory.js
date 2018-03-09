import React, { Component } from "react";

import "./Inventory.less";

const Width = 10;
const Height = 8;

class Inventory extends Component {
	state = {
		matrix: null
	}

	componentDidMount() {
		this.initialize();
	}

	initialize() {
		const matrix = [];

		for (let i = 0; i < Height; i++) {
			const row = [];

			for (let j = 0; j < Width; j++) {
				const cell = {};

				row.push(cell);
			}

			matrix.push(row);
		}

		this.setState({ matrix });
	}

	render() {
		const { matrix } = this.state;

		if (!matrix) {
			return <div></div>;
		}

		return (
			<div className="inventory">
				{matrix.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((cell, cellIndex) => (
							<div key={cellIndex} className="cell"></div>
						))}
					</div>
				))}
			</div>
		);
	}
}

export default Inventory;
