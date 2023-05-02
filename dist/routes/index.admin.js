"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Controllers
const adminController_1 = require("../controllers/adminController");
// Middlewares
const isAdminUser_1 = __importDefault(require("../middleware/isAdminUser"));
// Main routes
router.post('/', isAdminUser_1.default, adminController_1.createUser);
router.delete('/', isAdminUser_1.default, adminController_1.deleteUser);
module.exports = router;
//# sourceMappingURL=index.admin.js.map