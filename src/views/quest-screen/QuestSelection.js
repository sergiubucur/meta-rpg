import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import QuestRequirements from "./QuestRequirements";
import Item from "common/components/item/Item";

const QuestSelection = ({ quests, onStartQuest }) => {
	return (
		<div className="quest-selection">
			{quests.map((quest, i) => (
				<div className="quest" key={i}>
					<div className="section quest-icon">
						<div className="icon"><i className={`ra ${quest.icon}`} /></div>
					</div>
					<div className="section requirements">
						<QuestRequirements quest={quest} />
					</div>
					<div className="section reward">
						<div className="item-reward-container">
							<Item item={quest.rewardPlaceholderItem} draggable={false} source="reward" />
						</div>

						<div>
							<span className={classNames("chance", quest.successRate >= 0.5 ? "positive" : "negative")}>
								{Math.floor(quest.successRate * 100)}%
							</span> Chance
						</div>
					</div>
					<div className="section start-button">
						<button
							type="button"
							disabled={quest.successRate === 0}
							onClick={() => onStartQuest(quest)}>Start Quest</button>
					</div>
				</div>
			))}
		</div>
	);
};

QuestSelection.propTypes = {
	quests: PropTypes.array.isRequired,
	onStartQuest: PropTypes.func.isRequired
};

export default QuestSelection;
