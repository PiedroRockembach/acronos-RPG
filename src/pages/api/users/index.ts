import { NextApiRequest, NextApiResponse } from 'next'
import { GetUsers } from '../../../database';

export default function GET(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if( method === "GET") {
        try {
            const users = GetUsers()
            return res.status(200).json(users)
        } catch {

        }
    }

    return res.status(404).json({message: 'Page not found.'});
}