"use strict";

//Variables
var Alexa = require('alexa-sdk');
var SKILL_NAME = "Alexa Template";
var APP_ID = "";

//List of compliments
var COMPLIMENT_LIST = [
    "Damn son, you're looking mighty fine today!",
    "Wow! You made an Alexa skill. You're smarter than I thought!",
    "If you were a food, you'd be an endless supply of CheeseCake"
];

// Core handler - error
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
} 

//Handlers to manage the requests
var handlers = {
    'LaunchRequest': function(){
        this.emit('GetCompliment');
    },
    'GetComplimentIntent': function() {
        this.emit('GetCompliment');
    },
    'GetCompliment': function(){
        var complimentIndex = Math.floor(Math.random() * COMPLIMENT_LIST.length);
        var randomCompliment = COMPLIMENT_LIST[complimentIndex];

        //Output
        var speechOutput = "Your compliment " + randomCompliment;
        this.emit(":tellWithCard", speechOutput, SKILL_NAME, randomCompliment);

    },
    // Alexa Defalut Intents
    'AMAZON.HelpIntent': function(){
        var speechOutput = "You can say give me a compliment or you can say exit..";
        var reprompt = "What can I help you with ?";
        this.emit(":ask", speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Good Bye!");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Good Bye!");
    }
}
