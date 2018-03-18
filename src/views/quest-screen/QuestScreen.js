import React, { Component } from "react";

import "./QuestScreen.less";
import questService from "common/services/QuestService";
import QuestSelection from "./QuestSelection";
import QuestProgress from "./QuestProgress";

export default class QuestScreen extends Component {
	componentDidMount() {
		this.updateListener = questService.events.addListener("update", () => {
			this.forceUpdate();
		});

		if (!questService.currentQuest) {
			questService.generateQuests();
		} else {
			questService.calculateSuccessRates();
		}
	}

	componentWillUnmount() {
		questService.events.removeListener("update", this.updateListener);
	}

	handleStartQuestClick = (quest) => {
		questService.startQuest(quest);
	}

	render() {
		const { quests, currentQuest } = questService;

		return (
			<div className="quest-screen">
				{!currentQuest && <QuestSelection quests={quests} onStartQuest={this.handleStartQuestClick} />}
				{currentQuest && <QuestProgress />}
			</div>
		);
	}
}
