import React, { Component } from "react";

import "./QuestScreen.less";
import questService from "common/services/QuestService";
import Item from "common/components/item/Item";

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

		return (
			<div className="quest-screen">
				<div className="quest-selection">
					{quests.map((quest, i) => (
						<div className="quest" key={i}>
							<div className="section quest-icon">
								<div className="icon"><i className={`ra ${quest.icon}`} /></div>
							</div>
							<div className="section requirements">
								<div>Requirements: {Object.keys(quest.requirements).filter(x => quest.requirements[x] > 0).map(x => x + " " + quest.requirements[x]).join(", ")}</div>
							</div>
							<div className="section reward">
								<div className="item-reward-container">
									<Item item={quest.rewardPlaceholderItem} draggable={false} source="reward" />
								</div>

								<div>{quest.successRate.toFixed(2) * 100}% Chance</div>
							</div>
							<div className="section start-button">
								<button
									type="button"
									disabled={quest.successRate === 0}
									onClick={() => this.handleQuestClick(quest)}>Start Quest</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
