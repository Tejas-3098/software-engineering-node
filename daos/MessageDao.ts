import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import User from "../models/users/User";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    userMessagesAnotherUser = async (message: String, uid1: String, uid2: String): Promise<Message> => 
        MessageModel.create({message, from: uid1, to: uid2});
    findAllMessagesSentByUser = async (uid: String): Promise<Message[]> =>
        MessageModel.find({from:uid});
    findAllMessagesSentToUser = async (uid1: String, uid2: String): Promise<Message[]> =>
        MessageModel.find({from:uid1, to:uid2});
    userDeletesMessage = async (uid1: String, uid2: String, message:String): Promise<any> => 
        MessageModel.deleteMany({from:uid1, to:uid2});
}   