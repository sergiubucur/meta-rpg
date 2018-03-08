export default class Utils {
	static getCurrentRoute(routes) {
		return routes.filter(x => x.path).map(x => x.path).join("/").substr(1);
	}
}
