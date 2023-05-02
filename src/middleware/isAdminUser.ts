import { NextFunction, Request, Response } from "express";

// Mongo
import { client } from "../utils/database";

// Variables
const db = client.db('admin');
const collection = db.collection('users');

export default async function isAnAdminAuth(req: Request, res: Response, next: NextFunction) {
    const secretToken = req.headers.authorization?.split(' ')[1];
    const apiKey = req.headers['x-api-key'];

    console.log(secretToken)
    console.log("===========================")
    console.log(apiKey)

    if (!secretToken || !apiKey) {
        return res.status(401).json({
          message: 'Unauthorized: Missing api credentials'
        });
    } else {
        try {
            const data = await collection.findOne({ key_token: apiKey, secret_token: secretToken });
        
            if (!data) {
              return res.status(401).json({
                message: 'Unauthorized: Invalid api credentials'
              });
            };
        
            if (data.role !== 'admin') {
              return res.status(403).json({
                message: 'Forbidden: User does not have enough permissions',
                data: {
                  _id: data._id,
                  description: data.description,
                  role: data.role,
                }
              });
            } else {
                next()
            };
        } catch (err) {
            return res.status(500).json({
              message: 'Internal Server Error validating user credentials',
            });
        }
    };
};
