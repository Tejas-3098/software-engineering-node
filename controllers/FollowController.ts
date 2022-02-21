/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
  * @class FollowController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
  *     </li>
  *     <li>DELETE /api/users/:uid1/follows/:uid2 to record that a user no longer follows another user
  *     </li>
  *     <li>GET /api/users/:uid/following to retrieve all users followed by a user
  *     </li>
  *     <li>GET /api/users/:uid/followers to retrieve all users following a user
  *     </li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return FollowController
      */

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid1/follows/:uid2", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    userFollowsAnotherUser = (req: Request, res: Response) => 
    FollowController.followDao.userFollowsAnotherUser(req.params.uid1, req.params.uid2)
    .then(follows => res.json(follows));
    
    userUnfollowsAnotherUser = (req: Request, res:Response) => 
    FollowController.followDao.userUnfollowsAnotherUser(req.params.uid1, req.params.uid2)
    .then(status => res.send(status));

    findAllUsersFollowedByUser = (req: Request, res: Response) => 
    FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
    .then(follows => res.json(follows));

    findAllUsersThatFollowUser = (req: Request, res: Response) => 
    FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
    .then(follows => res.json(follows));
};