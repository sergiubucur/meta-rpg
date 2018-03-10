export default class Utils {
	static getCurrentRoute(routes) {
		return routes.filter(x => x.path).map(x => x.path).join("/").substr(1);
	}

	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
