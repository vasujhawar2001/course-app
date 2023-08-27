import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";


export default async(req: NextApiRequest, res : NextApiResponse) => {
    try{
        const client = await clientPromise;
        const db = client.db("Courses");
        await db.collection("courses").insertOne(req.body);
        res.json({ message: 'Course created successfully', course : req.body});
    }
    catch(e){
        console.log(e);
    }
}