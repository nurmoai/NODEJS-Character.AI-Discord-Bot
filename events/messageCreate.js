const { SendMessage } = require("../ai/SendMessage");
const config = require("../config.js");
const { isPingedOrReplied } = require("../utils/isPingedOrReplied");
const fs = require('fs');
const path = require('path');

module.exports = async (client, message) => {
  if (message.author.bot) return;

  // Define the file path
  const guildId = message.guild.id;
  const messagesPath = `./server_messages/${guildId}.json`

  // Ensure directory exists
  const dirPath = `./server_messages`
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Read existing messages
  let messages = [];
  if (fs.existsSync(messagesPath)) {
    const rawData = fs.readFileSync(messagesPath);
    messages = JSON.parse(rawData);
  }

  // Determine role based on whether the author is a bot or not
  const role = message.author.bot ? "assistant" : "user";

  // Add the new message and ensure only the last 5 messages are kept
  messages.push({
    content: `username: ${message.author.username}. Message: ${message.content}`,
    role: role,
  });

  if (messages.length > 5) {
    messages.shift(); // Remove the oldest message
  }

  // Write updated messages back to the file
  fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

  // Handle the bot response if pinged or replied
  if (await isPingedOrReplied(client, message)) { // Pass the client as an argument
    message.channel.sendTyping();
    const messageResponse = await SendMessage(messages, config.character_id);
    message.reply(messageResponse);
    return;
  }
};