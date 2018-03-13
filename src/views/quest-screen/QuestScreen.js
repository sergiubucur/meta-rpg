import React, { Component } from "react";

import "./QuestScreen.less";
import questService from "common/services/QuestService";

export default class QuestScreen extends Component {
	state = {
		message: null
	}

	componentWillMount() {
		questService.generateQuests();
	}

	handleQuestClick = (quest) => {
		this.setState({
			message: null
		}, () => {
			questService.attemptQuest(quest);
			questService.completeQuest();

			let message = "Quest failed.";
			if (questService.questSuccess) {
				if (!questService.acquireReward()) {
					message = "Quest succeeded but inventory was full, so no reward."
				} else {
					message = "Quest completed successfully!";
				}
			}

			questService.generateQuests();

			this.setState({ message });
		});
	}

	render() {
		const { quests } = questService;
		const { message } = this.state;

		return (
			<div className="quest-screen">
				{message &&
					<div>
						<div className={message === "Quest completed successfully!" ? "positive" : "negative"}>
							Result: {message}
						</div>

						<br />
					</div>
				}

				{quests.map((quest, i) => (
					<div className="quest" key={i}>
						<div>Requirements: {Object.keys(quest.requirements).filter(x => quest.requirements[x] > 0).map(x => x + " " + quest.requirements[x]).join(", ")}</div>
						<div>Success rate: {quest.successRate.toFixed(2) * 100}%</div>

						<br />

						<button type="button" onClick={() => this.handleQuestClick(quest)}>Attempt</button>

						<br /><br />
					</div>
				))}
			</div>
		);
	}
}
