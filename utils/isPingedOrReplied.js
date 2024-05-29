const isPingedOrReplied = async (client, message) => {
  if (message.mentions.has(client.user)) {
    return true;
  }
  if (message.reference) {
    const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
    if (repliedMessage.author.id === client.user.id) {
      return true;
    }
  }
  return false;
};
module.exports = { isPingedOrReplied };