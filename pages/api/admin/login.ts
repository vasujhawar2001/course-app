import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { SECRET } from "@/config";

if (!SECRET) {
    throw new Error('Invalid/Missing environment variable: "SECRET-JWT"')
  }

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
            const token = jwt.sign({ username, role: 'admin' }, SECRET!, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token });
           }
    } catch (e) {
        console.error(e);
    }
}