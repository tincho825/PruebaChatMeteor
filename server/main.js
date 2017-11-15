import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// add colors and fonts to MongoDB
	Text.insert({
		colors: ["#9A1818", "#8D8E94", "#9D9EA4", "#DE4F4F", "#BA2A2A", "#46474B", "#66676B", "#26272B"],
		fonts: ["Comic Sans MS", "Garamond", "Tw Cen MT", "Sans-serif", "Verdana", "Agency FB", "Cursive", "Courier"],
	});

});
