"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controllers
const betaController_1 = require("../controllers/betaController");
// Middlewares
const isAuthUser_1 = __importDefault(require("../middleware/isAuthUser"));
// Main routes
router.post('/:email', isAuthUser_1.default, betaController_1.createUser); // create a normal regular user -> If doesn't already exist
router.get('/', betaController_1.getAllUsers); // get all avaiable users
router.get('/granted-users', betaController_1.searchGrantedUsers); // search for granted users
router.get('/ungranted-users', betaController_1.searchUngrantedUsers); // search for ungranted users
router.get('/collection-info', betaController_1.getCollectionInfo); // get all avaiable users by email or id
router.get('/:key', betaController_1.getUserByEmailOrID); // get all avaiable users by email or id
router.delete('/:key', betaController_1.deleteUserByEmailOrID); // delete one user by email or id
router.put('/give-access/:key', betaController_1.grantBetaAccess); // grants acess to the beta -> By moving the user to the user collection
router.put('/block-user/:key', betaController_1.blockUserEmail); // block a user email to subscribe again
router.put('/', betaController_1.updateUserEmail); // update one user email
module.exports = router;
//# sourceMappingURL=index.beta.js.map