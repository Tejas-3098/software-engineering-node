/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null=null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid1/messages/:uid2", MessageController.messageController.findAllMessagesSentToUser);
            app.delete("/api/users/:uid1/messages/:uid2", MessageController.messageController.deleteMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body.message, req.params.uid1, req.params.uid2)
        .then(Message => res.json(Message));
    
    
    findAllMessagesSentByUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid) 
        .then((messages: Message[]) => res.json(messages));
    
    findAllMessagesSentToUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid2, req.params.uid1)
        .then((messages: Message[]) => res.json(messages));

    deleteMessage = (req: Request, res: Response) => 
        MessageController.messageDao.deleteMessage(req.params.uid1, req.params.uid2)
        .then(Message => res.json(Message));
       
};