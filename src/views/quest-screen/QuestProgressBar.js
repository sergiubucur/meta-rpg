import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const QuestProgressBar = ({ value }) => {
	return (
		<div className="quest-progress-bar">
			<div
				className={classNames("bar", { full: value === 1 })}
				style={{ width: `${Math.ceil(value * 100)}%` }}>
				<div className="flash" />
			</div>
		</div>
	);
};

QuestProgressBar.propTypes = {
	value: PropTypes.number.isRequired
};

export default QuestProgressBar;
