import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export default class TimeTracker {
	trackingData = null;

	constructor(trackingData, onUpdate, frequency) {
		if (!(trackingData.startDate instanceof Date && trackingData.endDate instanceof Date)) {
			throw new Error("startDate/endDate must be Date objects");
		}

		this.trackingData = trackingData;
		this.onUpdate = onUpdate;

		if (this.getPercentComplete() === 1) {
			return;
		}

		const interval = setInterval(() => {
			const percentComplete = this.getPercentComplete();
			this.onUpdate();

			if (percentComplete === 1) {
				clearInterval(interval);
			}
		}, frequency);
	}

	getPercentComplete() {
		const now = new Date();

		if (now <= this.trackingData.startDate) {
			return 0;
		}

		if (now >= this.trackingData.endDate) {
			return 1;
		}

		const total = Math.floor((this.trackingData.endDate - this.trackingData.startDate) / 1000);
		const current = Math.floor((now - this.trackingData.startDate) / 1000);

		return current / total;
	}

	getDurationLeft() {
		const now = new Date();

		if (now >= this.trackingData.endDate) {
			return "00:00:00";
		}

		const duration = moment.duration(Math.floor((this.trackingData.endDate - now) / 1000) + 1, "seconds");
		return duration.format("hh:mm:ss", { trim: false });
	}
}
