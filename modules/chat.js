// Chat Client Info
const client = require('../config/client-info');

// Twurple Init
const { ChatClient } = require('@twurple/chat');

// FileSystem
const { promises: fs } = require('fs');

// Raffle functions
const { RaffleStart, RaffleEnd } = require('./raffles');

// Get the Auth Provider to connect to chat
const { authProvider } = require('./auth');

// Get socket IO
var io;
module.exports = function(importIO) {
    io = importIO;
}


/**
 *  Connect to Chat
 *
 */
const chatInit = async function() {

    // Chat Client init
    const chatClient = new ChatClient({ authProvider, channels: ['vipertronnx'] });
    await chatClient.connect();

    // Indicate when bot is connected to chat
    chatClient.onConnect(() => {
        console.log("chat is connected")
    })

    // Listen to chat messages
    chatClient.onMessage((channel, user, text, msg) => {

      /**
       * Detect Highlight messages, and if from an appropriate user, send the
       * message to the text-alert overlay
       *
       */
      if(msg.isHighlight && (msg.userInfo.isBroadcaster || msg.userInfo.isMod || msg.userInfo.isVip)) {
        // Do Highlight stuff
        io.emit('text-alert', { message: text });
      }

      // Console some things
      //console.log(msg);
      console.log(text);

      /**
       * Automated raffle start / stop commands
       *
       */
      if(text === '!startraffles') { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleStart(); } }
      if(text === '!endraffles')   { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleEnd();   } }

    });

  }


/**
 * Initialize the chat bot
 *
 */
chatInit();