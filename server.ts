/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
 import express, {Request, Response} from 'express';
 import UserController from "./controllers/UserController";
 //import TuitController from "./controllers/TuitController";
 //import LikeController from "./controllers/LikeController";
 import mongoose from "mongoose";
 
 // build the connection string
 const PROTOCOL = "mongodb+srv";
 const DB_USERNAME = process.env.DB_USERNAME;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const HOST = "cluster0.m8jeh.mongodb.net";
 const DB_NAME = "myFirstDatabase";
 const DB_QUERY = "retryWrites=true&w=majority";
 const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
 // connect to the database
 mongoose.connect(connectionString);
 
 const app = express();
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 // create RESTful Web service API
 const userController = UserController.getInstance(app);
 
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);