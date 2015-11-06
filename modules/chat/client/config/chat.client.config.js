'use strict';

// Configuring the Chat module
angular.module('chat',[
	'luegg.directives'
]).run(['Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Chat',
      state: 'chat.list'
    });
  }
]);
