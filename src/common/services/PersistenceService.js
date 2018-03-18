const StorageKey = "meta-rpg";

class PersistenceService {
	reset() {
		window.localStorage.removeItem(StorageKey);
	}

	load() {
		return JSON.parse(window.localStorage.getItem(StorageKey));
	}

	save(obj) {
		window.localStorage.setItem(StorageKey, JSON.stringify(obj));
	}
}

export default new PersistenceService();
