const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    // Ignore messages from bots
    if (message.author.bot) return;
    if (message.author.system) return;

    const flirtyRemarks = [
    "Soo… um, I might've smiled a little too much reading your message 😊",
    "Okay don't laugh… but I kinda look forward to talking to you way more than I should 😳",
    "I was gonna wait a bit before sending a message, but I couldn't resist 😅",
    "This is me pretending I'm not blushing just because you replied 🙈",
    "You make it really hard to play it cool, you know that? 😶‍🌫️",
    "You make my phone 100x more interesting when your name pops up 🫠",
    "I was trying to sound chill but then I read what you said and just... butterflies 🥰",
    "Lowkey nervous sending this, but highkey wanted to talk to you 😬",
    "You're like... accidentally my favorite person to text 🥺",
    "This whole conversation is just me trying not to sound totally obsessed 🫣",
    "Hi... 😳 I had this whole cool thing planned to say, but... hi.",
    "Heeyyy... 😶‍🌫️ sorry, I smiled too hard at your message.",
    "Oh wow, a hi from you? Day = made 🥺",
    "Hey there... 😌 I may or may not have rehearsed this moment.",
    "Hi 😊 sorry if I seem nervous... you do that to people.",
    "Um… hi 😅 I was just trying to look cool when you texted.",
    "Hi! 😳 I don't usually get flustered… but you're kind of an exception.",
    "Hey... 🫣 I was hoping you'd say hi, just didn't think you actually would.",
    "Hiii... 🥺 I was kinda hoping you'd say that first.",
    "Oh... hi 🫣 now I suddenly forgot how words work.",
    "Heyy 😊 is it okay if I'm smiling too much right now?",
    "Hi... you're already making me blush and we just started talking 😳",
    "Umm... hi 🥰 I practiced saying that in my head like 10 times.",
    "Hi… 🐥 I'd say something cool, but I'm too busy being flustered.",
    "Hey 😌 not to be dramatic, but that hi just saved my whole day.",
    "Hi there... 😳 can I admit I got a little nervous seeing your name pop up?",
    ];
    

    try {
        //check specific words are mentioned
        if (message.content.toLowerCase().startsWith("hi ")) {

            //log the message
            console.log(`said hi`);

            //reply with a random flirty remark
            message.reply(`${flirtyRemarks[Math.floor(Math.random() * flirtyRemarks.length)]}`);
        };

    } catch (error) {
        console.log("Error in message create event handler", error);
    };
  },
};
