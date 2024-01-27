import { NextApiRequest, NextApiResponse } from 'next'
import firestoreDatabase from '../../../database';
import { auth } from '../../../database/Firestore'

export default function GET(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    console.log(method);
    
    switch(method) {
        case "GET":
            try {
                
                
                const users = firestoreDatabase.GetUsers()
                return res.status(200).json(users)
                
            } catch(e: unknown) {
                console.log(e)
                break;
            }
        
        case "POST":
            try {
                

            }   catch(e:unknown) {
                console.log(e);
                break;
            } 
    }

    

    return res.status(404).json({message: 'Page not found.'});
}