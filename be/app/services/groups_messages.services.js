const GroupMessagesModel = require("../models/groups_messages.model");

exports.create = async (messages) => {
  return await GroupMessagesModel.create(messages);
};

exports.getMessageById = async (messageId) => {
  return await GroupMessagesModel.findById(messageId)
    .populate("groupId")
    .populate("senderId");
};
exports.createOffer = async (offer) => {
  return await GroupMessagesModel.create(offer);
}

exports.getGroupMessage = async (groupId) => {
  return await GroupMessagesModel.find(
    { groupId },
  )
    .populate("groupId")
    .populate("senderId")
    .populate("eventId");
};

exports.updateOffer = async (group) => {
  const update = await GroupMessagesModel.findByIdAndUpdate(group._id, {
    $set:{
      action_performed: group.action_performed,
      action: group.action,
    },
  });

  return update ;
  
}