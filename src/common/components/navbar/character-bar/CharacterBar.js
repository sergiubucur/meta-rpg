import React, { Component } from "react";

import "./CharacterBar.less";
import characterService from "common/services/CharacterService";

export default class CharacterBar extends Component {
	componentDidMount() {
		this.updateListener = characterService.events.addListener("update", (levelUp) => {
			console.log("levelUp", levelUp);
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		characterService.events.removeListener("update", this.updateListener);
	}

	render() {
		const { level, xp, gold } = characterService;

		const currentXp = xp - characterService.getTotalXpToLevel();
		const xpToNextLevel = characterService.getXpToNextLevel();

		return (
			<div className="character-bar">
				<span>Level {level}</span>
				{level < 60 && <span>{currentXp} / {xpToNextLevel} XP</span>}
				<span>{gold} gold</span>
			</div>
		);
	}
}
