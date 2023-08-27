import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async(req : NextApiRequest, res : NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("Courses");
        const { username, password } = req.body;
        const admin = await db
            .collection("admins")
            .findOne({username, password})

         if (!admin) {
             res.status(403).json({ message: 'Admin already exists' });
             return;
           } else {
            res.json({ message: 'Logged in successfully' });
           }
    } catch (e) {
        console.error(e);
    }
}