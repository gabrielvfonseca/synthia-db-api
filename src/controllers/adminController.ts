import { 
    Request, 
    Response 
} from 'express';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

import jwt from 'jsonwebtoken';

import { auth } from "../config";

// Mongo
import { client } from "../utils/database";

// Variables
const db = client.db('admin');
const collection = db.collection('users');

const shuffleWord = (word: string) => {
    // Convert the word to an array of characters
    const characters = word.split('');
  
    // Shuffle the array
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
  
    // Join the characters back into a string
    const shuffledWord = characters.join('');
    return shuffledWord;
  }

const generateAccessToken = (role: string) => {
    const payload = { sub: shuffleWord(auth.jwt.secret), role: role };
    return jwt.sign(payload, shuffleWord(auth.jwt.secret));
};
  
const generateSecretToken = (role: string) => {
    const payload = { sub: shuffleWord(auth.jwt.secret), role: role };
    return jwt.sign(payload, shuffleWord(auth.jwt.secret));
};

export async function createUser(
    req: Request, 
    res: Response, 
) {
    const { description, role } = req.body;

    const data: {
        _id: string,
        description?: string,
        key_token: string,
        secret_token: string,
        role: 'admin' | 'editor' | 'guest',
        createdAt: string,
    } = {
        _id: uuidv4(),
        description: description,
        key_token: generateAccessToken(role || 'guest'),
        secret_token: generateSecretToken(role || 'guest'),
        role: role || 'guest',
        createdAt: moment().format(),
    };

    try {     
        await collection.insertOne(data);
        
        return res.status(201).json({
            message: "User created successfuly",
            data: {
                _id: data._id,
                key_token: data.key_token,
                secret_token: data.secret_token,
                role: data.role,
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to create user',
        });
    };
};

export async function deleteUser(req: Request, res: Response) {
    const { _id, key, secret } = req.body;
    
    const params = { _id: _id, key_token: key, secret_token: secret }

    try {
        const user = await collection.findOne(params);

        if (user) {
            await collection.deleteOne(params);
    
            return res.status(200).json({
                message: "Deleted user successfuly",
                data: {
                    _id: _id,
                    key: key,
                    secret: secret,
                },
            });
        } else {
            return res.status(409).send({
                message: "User doesn't exist",
            }); 
        };
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to create user',
        });
    };
};