const mongoose = require('mongoose'),
  Message = require('../../db/models/chat/privateMessages/messageModel'),
  User = require('../../db/models/userModel'),
  Conversation = require('../../db/models/chat/privateMessages/conversationModel');

exports.sendMessage = async (req, res) => {
  const { sender, recipient, text, conversation } = req.body;

  //  await Conversation.findById(conversation);
  //   console.log('I am after find');
  //   console.log(conversation);
  //   if (!conversation) {
  //     // await message.save();
  //     console.log('hello world!');
  //     message.createNewConversation(req.body);
  //     console.log(conversation);
  //     await message.save();
  //     res.status(200).json( { message: 'sent!' } );
  //   } else {
  try {
    const message = new Message(req.body);
    await message.save();
    console.log(message);
    const found = await Conversation.findById(conversation);
    console.log(found);
    found.messages.push(message);
    console.log('I am after pushing found');
    await found.save();
    console.log(found);
    res.status(200).json({ message: 'sent!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).json({ message: 'not a valid message' });
  try {
    const message = await Message.findById({ _id });
    if (!message) return res.status(400).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMessageById = async (req, res) => {
  const _id = req.params.id;
  try {
    const message = await Message.findByIdAndDelete({ _id });
    if (!message) {
      return res.status(404).json({ message: 'Not message found!' });
    }
    await res.status(200).json({ message: 'Message Deleted!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.getMessageThread = async (req, res) => {
//   const _id = req.params.id;
//   console.log(_id);
//   if (!mongoose.Types.ObjectId.isValid(_id))
//     return res.status(400).json({ message: 'not a valid message' });
//   try {
//     const message = await Message.findById({ _id });
//     if (!message) return res.status(400).json({ message: 'Message not found' });
//     res.status(200).json(message);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
