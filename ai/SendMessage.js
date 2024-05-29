// https://docs.nurmo.app/introduction

const NurmoAI = require("nurmoai");


const nurmo = new NurmoAI({
  apiKey: process.env['NURMOAI_KEY'], // Change this to your API key
});

async function SendMessage(messages, character) {
  const aiResponse = await nurmo.createCompletion({
    messages,
    model: "nurmo-3",
    character
  });

  return aiResponse;
}

module.exports = { SendMessage }
