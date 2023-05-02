"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(202).json({
        hello: 'looks like you found my server',
        version: '1.0.0',
        server: 'website-manager-server',
        madeBy: '@gabrielvfonseca',
        endpoints: [
            { name: 'POST /api/waitlist', description: 'Apply to our waitlist beta' },
        ]
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map