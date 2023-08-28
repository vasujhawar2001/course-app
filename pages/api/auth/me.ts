import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "@/lib/mongodb";
import { authenticateJwt } from '@/lib/middleware';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   try {
       const client = await clientPromise;
       // const db = client.db("Courses");
       const authHeader = req.headers.authorization;
       if(authHeader){
        const token = authHeader.split(' ')[1];

        authenticateJwt(token, (user)=>{
            if(!user){
                res.status(403).json({message : "Not Authenticated"})
            }
        })
       }
   } catch (e) {
       console.error(e);
   }
};