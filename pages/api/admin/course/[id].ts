import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export default async(req: NextApiRequest, res : NextApiResponse) => {
    try{
        const client = await clientPromise;
        const db = client.db("Courses");

        const { id } = req.query;
        console.log(id);
        const course = await db.collection("courses").findOne({
            _id: new ObjectId(id as string), // Convert the string ID to ObjectId
        });

        if(course){
            res.json({ course });
        }
        else{
            res.status(404).json({ message: 'Course not found' });
        }
    }
    catch(e){
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}
