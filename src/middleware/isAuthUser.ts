import { NextFunction, Request, Response } from "express";

// Mongo
import { client } from "../utils/database";

// Variables
const db = client.db('admin');
const collection = db.collection('users');

export default async function isAnAuthUser(req: Request, res: Response, next: NextFunction) {
    const secretToken = req.headers.authorization?.split(' ')[1];
    const apiKey = req.headers['x-api-key'];    

    if (!secretToken || !apiKey) {
        return res.status(401).json({
          message: 'Unauthorized: Missing api credentials'
        });
    } else {
        try {
            const data = await collection.findOne({ key_token: apiKey });
        
            if (!data) {
              return res.status(401).json({
                message: 'Unauthorized: Invalid api credentials'
              });
            } else {
                if (data?.role == 'guest' && 
                    (req.method === 'POST' || req.method === 'DELETE')) {
                    return res.status(500).json({
                        message: 'User does not have enough permissions',
                        method: req.method,
                        data: {
                            _id: data._id,
                            description: data.description,
                            role: data.role,
                        }
                    });
                } else {
                    next();
                }
            }
        } catch (err) {
            return res.status(500).json({
              message: 'Internal Server Error validating user credentials',
            });
        }
    };
};
