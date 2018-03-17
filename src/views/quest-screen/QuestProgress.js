import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-3";

import questService from "common/services/QuestService";
import QuestProgressBar from "./QuestProgressBar";

class QuestProgress extends Component {
	state = {
		inventoryError: false,
		router: PropTypes.object.isRequired
	}

	handleGetRewardClick = () => {
		if (questService.getReward()) {
			questService.generateQuests();

			this.props.router.push("");
		} else {
			this.setState({
				inventoryError: true
			});
		}
	}

	handleContinueClick = () => {
		questService.generateQuests();
	}

	render() {
		const { inventoryError } = this.state;
		const { questResult } = questService;

		return (
			<div className="quest-progress">
				{questResult === null &&
					<div>
						Quest In Progress

						<div>
							<QuestProgressBar value={1} />
						</div>
					</div>
				}

				{questResult !== null &&
					<div>
						<div>
							{questResult ? "Quest Completed Successfully!" : "Quest Failed!"}
						</div>

						<div>
							{questResult && <button type="button" onClick={this.handleGetRewardClick}>Get Reward</button>}
							{!questResult && <button type="button" onClick={this.handleContinueClick}>Continue</button>}
						</div>

						{inventoryError && <div className="error">Inventory is full.</div>}
					</div>
				}
			</div>
		);
	}
}

export default withRouter(QuestProgress);
