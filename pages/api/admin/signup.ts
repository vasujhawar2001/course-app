import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { SECRET } from '@/config';

type Data = {
  message?: string,
  token?: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
   try {
       const client = await clientPromise;
       const db = client.db("Courses");
       const { username, password } = req.body;
       const admin = await db
           .collection("admins")
           .findOne({username})
                                      //    .sort({ metacritic: -1 })
                                      //    .limit(10)
                                      //    .toArray();
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
          } else {
            await db.collection("admins").insertOne({ username, password })
            // new Admin({ username, password });
            // await newAdmin.save();
            const token = jwt.sign({ username, role: 'admin' }, SECRET!, { expiresIn: '12h' });
            res.json({ message: 'Admin created successfully', token});
          }
   } catch (e) {
       console.error(e);
   }
};