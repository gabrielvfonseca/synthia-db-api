import express from 'express';

const router = express.Router(); 

// Controllers
import {
    createUser,
    getAllUsers,
    getUserByEmailOrID,
    searchGrantedUsers,
    searchUngrantedUsers,
    deleteUserByEmailOrID,
    updateUserEmail,
    blockUserEmail,
    grantBetaAccess,
    getCollectionInfo,
} from "../controllers/betaController";
 
// Middlewares
import isAuth from "../middleware/isAuthUser";

// Main routes
router.post('/:email', isAuth, createUser); // create a normal regular user -> If doesn't already exist

router.get('/', getAllUsers); // get all avaiable users

router.get('/granted-users', searchGrantedUsers) // search for granted users
router.get('/ungranted-users', searchUngrantedUsers) // search for ungranted users

router.get('/collection-info', getCollectionInfo); // get all avaiable users by email or id

router.get('/:key', getUserByEmailOrID); // get all avaiable users by email or id

router.delete('/:key', deleteUserByEmailOrID) // delete one user by email or id

router.put('/give-access/:key', grantBetaAccess) // grants acess to the beta -> By moving the user to the user collection
router.put('/block-user/:key', blockUserEmail) // block a user email to subscribe again
router.put('/', updateUserEmail) // update one user email


module.exports = router;