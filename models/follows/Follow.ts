/**
 * @file Declares Follow data type representing relationship between
 * 2 users, as in a user follows another user
 */
 import User from "../users/User";

 export default interface Follow {
     userFollowed: User,
     followedBy: User
 };