const ChatGroupModel = require("../models/chat_group.model");
const GroupMessagesModel = require("../models/groups_messages.model");

exports.createGroup = async (chat) => {
  if (chat.isOneToOne) {
    var query = {
      $and: [
        { isOneToOne: true },
        { members: { $size: 2 } },
        { members: { $elemMatch: { userId: chat.members[0].userId } } },
        { members: { $elemMatch: { userId: chat.members[1].userId } } },
      ],
    };
    console.log(query);
    let isExistingGroup = await ChatGroupModel.find(query);
    if (isExistingGroup && isExistingGroup.length > 0) {
      return isExistingGroup[0];
    }
  }
  return await ChatGroupModel.create(chat);
};

exports.setLastMessage = async (groupId, lastMessage) => {
  return await ChatGroupModel.findByIdAndUpdate(groupId, {
    $set: {
      lastMessage
    }
  });
};

exports.getGroup = async (groupId) => {
  return await ChatGroupModel.findById(groupId);
};

exports.getUserGroups = async (userId) => {
  var query = { members: { $elemMatch: { userId } } };
  let groups = await ChatGroupModel.find(query).populate("members.userId").populate('lastMessage');
  let newGroups = (groups || []).map((g) => {
    let g1 = g.toJSON();
    let name = g1.name;
    let image = g1.image;
    if (g1.isOneToOne) {
      try {
        member = g1.members.find(
          (m) => m.userId._id.toString() !== userId.toString()
        );
        if (member && member.userId) {
          name = member.userId.user_name;
          image = member.userId.image
        }
      } catch (err) {}
    }
    return {
      ...g1,
      name,
      image
    };
  });

  newGroups.sort((a, b) => {
    if (a.lastMessage && b.lastMessage) {
      return b.lastMessage.createdAt - a.lastMessage.createdAt;
    } else {
      return 0; // Handle cases where lastMessage is missing
    }
  });
  return newGroups;
};
