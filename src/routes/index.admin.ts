import express from 'express';

const router = express.Router(); 

// Controllers
import {
    createUser,
    deleteUser,
} from "../controllers/adminController";
 
// Middlewares
import isAdmin from "../middleware/isAdminUser";

// Main routes
router.post('/', isAdmin, createUser);

router.delete('/', isAdmin, deleteUser);

module.exports = router;