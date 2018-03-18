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
		const { currentQuest, questResult } = questService;

		return (
			<div className="quest-progress">
				<div className="section quest-icon">
					<div className="icon"><i className={`ra ${currentQuest.icon}`} /></div>
				</div>

				<div className="section chance-eta">
					<div className="chance">
						<span className={currentQuest.successRate >= 0.5 ? "positive" : "negative"}>
							{Math.floor(currentQuest.successRate * 100)}%
						</span>&nbsp;Chance
					</div>

					{questResult !== null &&
						<div className="message">
							{questResult && "Quest completed successfully!"}
							{!questResult && "Quest failed."}
						</div>
					}

					{questResult === null &&
						<div className="eta">
							00:59:59
						</div>
					}
				</div>

				<div className="section progress">
					{questResult === null &&
						<div>
							<QuestProgressBar value={1} />
						</div>
					}

					{questResult !== null &&
						<div>
							{questResult && <button type="button" onClick={this.handleGetRewardClick}>Get Reward</button>}
							{!questResult && <button type="button" onClick={this.handleContinueClick}>Continue</button>}
						</div>
					}
				</div>

				<div className="section error-message">
					{questResult !== null && inventoryError && <div className="error">Inventory is full.</div>}
				</div>
			</div>
		);
	}
}

export default withRouter(QuestProgress);
