import React, { Component } from "react";

import "./CharacterBar.less";
import characterService from "common/services/CharacterService";

const AnimationDuration = 1000;

export default class CharacterBar extends Component {
	state = {
		flash: false
	}

	componentDidMount() {
		this.updateListener = characterService.events.addListener("update", () => {
			if (!this.state.flash) {
				this.setState({
					flash: true
				}, () => {
					setTimeout(() => {
						this.setState({
							flash: false
						});
					}, AnimationDuration);
				});
			} else {
				this.forceUpdate();
			}
		});
	}

	componentWillUnmount() {
		characterService.events.removeListener("update", this.updateListener);
	}

	render() {
		const { level, xp, gold } = characterService;
		const { flash } = this.state;

		const currentXp = xp - characterService.getTotalXpToLevel();
		const xpToNextLevel = characterService.getXpToNextLevel();

		return (
			<div className="character-bar">
				{ flash && <div className="flash" /> }

				<div className="values">
					<span>Level {level}</span>
					{level < 60 && <span>{currentXp} / {xpToNextLevel} XP</span>}
					<span>{gold} gold</span>
				</div>
			</div>
		);
	}
}
