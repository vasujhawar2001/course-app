import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "@/lib/mongodb";

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
            return;
          } else {
            await db.collection("admins").insertOne({ username, password })
            // new Admin({ username, password });
            // await newAdmin.save();
            res.json({ message: 'Admin created successfully'});
          }
   } catch (e) {
       console.error(e);
   }
};