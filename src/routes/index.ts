import express, { 
    Request, 
    Response,
} from 'express';

const router = express.Router(); 

router.get('/', (req: Request, res: Response) => {
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