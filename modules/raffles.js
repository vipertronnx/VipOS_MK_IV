/**
 * For this chat client, we're using TMI.js
 * 
 * It's easier, lightweight, and I need to use it to connect as my primary account, not 
 * the bot account, to drive the raffles ( as they cannot be called from the bot that
 * provides the raffle service ) 
 * 
 */ 
const tmi = require('tmi.js');

// Get the configuration options.
const { opts } = require('../config/raffle-info')


/**
 * Create a client with our options
 * 
 */ 
const client = new tmi.client(opts);


// Register our event handlers (defined below)
client.on('connected', onConnectedHandler);
client.on("disconnected", onDisconnectedHandler);


// Start and End commands that can be executed via the bot chat client
const RaffleStart = function() { client.connect();    }
const RaffleEnd   = function() { client.disconnect(); }


/**
 * The main raffle timer, determines the raffle amount
 * and how much time before the next raffle
 * 
 */
function raffleTimer() { 
  var timeout = getRandomInt(1260000,1920000);
  var raffleAmt = getRaffleAmount();
  var minutes = ((timeout / 1000) / 60);
  
  client.say(`vipertronnx`, `!raffle `+ raffleAmt);
  console.log(`* A raffle for ` + raffleAmt + ` has begun.`);
  console.log(`* Next raffle in ` + minutes + ` minutes.`);
  console.log(`*`);

  setTimeout(() => { raffleTimer(); }, timeout );
}


/**
 * getRandomInt
 * 
 * Takes a min and a max and will return
 * a random number ( int ) between the two
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns int
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}


/**
 * getRaffleAmount
 * 
 * Out of the array of choices, picks a random index
 * to use for the raffle amount
 * 
 * @returns string
 */
function getRaffleAmount() {
  const points = ['10k','15k','20k','25k','30k','35k','40k','45k','50k'];
  const index = getRandomInt(0,8);
  return points[index];
}
 

/**
 * Called every time the bot connects to Twitch chat
 * 
 */ 
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  setTimeout(raffleTimer,1000);
}


/**
 * Called every time the bot disconnects to Twitch chat
 * 
 */ 
function onDisconnectedHandler () {
    console.log(`* disconnected`);    
    clearTimeout();  
}


/**
 * Exports
 * 
 */
module.exports = { RaffleStart, RaffleEnd }