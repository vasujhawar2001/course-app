import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "@/lib/mongodb";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//    try {
//        const client = await clientPromise;
//        const db = client.db("Courses");

//        const admin = await db
//            .collection("admins")
//         //    .findOne({username : req.user.username})  // need to fix this req.user is not valid
//         
//         
//         
//         if (!admin) {
//             res.status(403).json({msg: "Admin doesnt exist"})
//             return
//             }
//             res.json({
//                 username: admin.username
//             })
//    } catch (e) {
//        console.error(e);
//    }
// };