export default class Utils {
	static getCurrentRoute(routes) {
		return routes.filter(x => x.path).map(x => x.path).join("/").substr(1);
	}

	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// https://stackoverflow.com/a/6274381
	static shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}

		return a;
	}

	static randomSlice(array, count) {
		return this.shuffle(array.slice(0)).slice(0, count);
	}
}
