import EventDispatcher from "simple-event-dispatcher";

export default class TimeTracker {
	events = new EventDispatcher();

	interval = null;
	trackingData = null;

	track(trackingData, frequency = 10000) {
		if (!(trackingData.startDate instanceof Date && trackingData.endDate instanceof Date)) {
			throw new Error("startDate/endDate must be Date objects");
		}

		this.trackingData = trackingData;

		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}

		if (this._calculatePercentComplete() === 100) {
			return true;
		}

		this.interval = setInterval(() => {
			const percentComplete = this._calculatePercentComplete();
			this.events.dispatch("update", percentComplete);

			if (percentComplete === 100) {
				clearInterval(this.interval);
				this.interval = null;
			}
		}, frequency);

		return false;
	}

	_calculatePercentComplete() {
		const now = new Date();

		if (now <= this.trackingData.startDate) {
			return 0;
		}

		if (now >= this.trackingData.endDate) {
			return 100;
		}

		const total = Math.floor((this.trackingData.endDate - this.trackingData.startDate) / 1000);
		const current = Math.floor((now - this.trackingData.startDate) / 1000);

		return Math.floor((current / total) * 100);
	}
}
