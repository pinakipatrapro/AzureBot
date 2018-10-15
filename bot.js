
const { ActivityTypes } = require('botbuilder');
const {MessageFactory} = require('botbuilder');


const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

class MyBot {
  
  constructor(conversationState) {
     
    this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
    this.conversationState = conversationState;
  }
   
  async onTurn(turnContext) {
    if (turnContext.activity.type === ActivityTypes.Message) {
      let count = await this.countProperty.get(turnContext);
      count = count === undefined ? 1 : ++count;
      var reply = MessageFactory.suggestedActions(['Red', 'Yellow', 'Blue'], 'What is the best color?');
      await turnContext.sendActivity(`${count}`);
      await this.countProperty.set(turnContext, count);
    } else {
      await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
    }
    await this.conversationState.saveChanges(turnContext);
  }
}
module.exports.MyBot = MyBot;