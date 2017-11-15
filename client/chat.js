if (Meteor.isClient) {  
  
  // click Go! button event
  Template.body.events({
    'click .login_button'(event) {
      if (usernameID.value != '') {
        Session.set('username', usernameID.value);
        $(".login").css('visibility', 'hidden');
        $(".login").css('max-height', '0px');
        $("#chat").css('visibility', 'visible');
        $(".input_message").css('visibility', 'visible');
        $(".welcome").css('visibility', 'visible');

        // get color and font from Mongo
        var text_index = Math.floor(Math.random() * (Text.find().fetch()[0].colors.length - 1) );
        var ColorsFonts = Text.find().fetch()[0];
        Session.set('userTextColor', ColorsFonts.colors[text_index]);
        Session.set('userTextFont', ColorsFonts.fonts[text_index]);
      }
    }
  });

  // Show messages (in reverse order)
  Template.chat_messages.helpers({
    messages: function() {
      return Messages.find({}, { sort: { time: -1}});
    }
  });

  // Show username in welcome message
  Template.welcome.helpers({
    user_welcome: function() {
      return  Session.get('username');
    }
  });

  // send message event
  Template.input.events = {
    'keypress input#message' : function (event) {
      if (event.which == 13) { // enter key is pressed
        if (message.value != '') {

          // add to MongoDB
          Messages.insert({
            username: Session.get('username'),
            message: message.value,
            userTextColor: Session.get('userTextColor'),
            userTextFont: Session.get('userTextFont'),
            time: Date.now(),  // used to invert order of messeges
          });
 
          // clear input message
          document.getElementById('message').value = '';
          message.value = '';

          // scroll to the top
          var element = document.getElementById('chat');
          element.scrollTop = 0;

        }
      }
    }
  }

}