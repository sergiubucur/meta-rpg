import React, { Component } from "react";

import "./QuestScreen.less";
import questService from "common/services/QuestService";
import QuestSelection from "./QuestSelection";

export default class QuestScreen extends Component {
	componentWillMount() {
		questService.generateQuests();
		questService.calculateSuccessRates();
	}

	handleStartQuestClick = (quest) => {
		questService.startQuest(quest);
		questService.completeQuest();

		if (questService.questResult) {
			questService.acquireReward();
		}

		questService.generateQuests();
		questService.calculateSuccessRates();

		this.forceUpdate();
	}

	render() {
		const { quests } = questService;

		return (
			<div className="quest-screen">
				<QuestSelection quests={quests} onStartQuest={this.handleStartQuestClick} />
			</div>
		);
	}
}
