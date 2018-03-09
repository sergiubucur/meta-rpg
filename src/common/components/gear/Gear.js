import React, { Component } from "react";

import "./Gear.less";

class Gear extends Component {
	render() {
		return (
			<div className="gear">
				<div className="column1">
					<div className="gear-cell hands"></div>
					<div className="gear-cell main-hand"></div>
				</div>

				<div className="column2">
					<div className="gear-cell head"></div>
					<div className="gear-cell chest"></div>
					<div className="gear-cell legs"></div>
					<div className="gear-cell feet"></div>
				</div>

				<div className="column3">
					<div className="gear-cell ring"></div>
					<div className="gear-cell off-hand"></div>
				</div>
			</div>
		);
	}
}

export default Gear;
