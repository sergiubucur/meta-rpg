import React from "react";
import PropTypes from "prop-types";

const QuestProgressBar = ({ value }) => {
	return (
		<div className="quest-progress-bar">
			<div className="bar" style={{ width: `${Math.ceil(value * 100)}%` }}>
				<div className="flash" />
			</div>
		</div>
	);
};

QuestProgressBar.propTypes = {
	value: PropTypes.number.isRequired
};

export default QuestProgressBar;
