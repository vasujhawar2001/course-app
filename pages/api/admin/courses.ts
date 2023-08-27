import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";


export default async(req: NextApiRequest, res : NextApiResponse) => {
    try{
        const client = await clientPromise;
        const db = client.db("Courses");
        const courses = await db.collection("courses")
        .find({})
        .toArray(); // bitch
        //console.log(courses);
        res.status(200).json({courses});
    }
    catch(e){
        console.error(e);
    }
}
