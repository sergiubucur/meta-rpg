import EventDispatcher from "simple-event-dispatcher";

class CharacterService {
	events = new EventDispatcher();

	level = 1;
	gold = 0;
}

export default new CharacterService();
