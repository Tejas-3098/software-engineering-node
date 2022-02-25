/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null=null;

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/uid1/messages/uid2", MessageController.messageController.userMessagesAnotherUser);
            app.get("/api/users/uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/uid1/messages/uid2", MessageController.messageController.findAllMessagesSentToUser);
            app.delete("/api/")
        }
        return MessageController.messageController;
    }

    private constructor() {}

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.body, req.params.uid1, req.params.uid2)
        .then((messages: Message) => res.json(messages));
    
    
    findAllMessagesSentByUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid) 
        .then((messages: Message[]) => res.json(messages));
    
    findAllMessagesSentToUser = (req: Request, res: Response) => 
        MessageController.messageDao.findAllMessagesSentToUser(req.params.uid2, req.params.uid1)
        .then((messages: Message[]) => res.json(messages));

    userDeletesMessage = (req: Request, res: Response) => 
        MessageController.messageDao.userDeletesMessage(req.params.uid1, req.params.uid2, req.body);
       
};