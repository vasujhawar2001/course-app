
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const courses = {
    "courses": [
        {
            "_id": "64afd077657e0e701d309a44",
            "title": "Full stack development new",
            "description": "rat singh",
            "price": 5999,
            "imageLink": "https://d33g7sdvsfd029.cloudfront.net/subject/2023-01-17-0.3698267942851394.jpg",
            "published": true,
            "__v": 0
        },
        {
            "_id": "64b4e739820df2ea9d38aa7f",
            "title": "Html22",
            "description": "Learn the freaking html",
            "price": 222211,
            "imageLink": "https://th.bing.com/th/id/OIP.PVOhIhZ2cfFJVWI3U9WG6AHaE7?w=234&h=180&c=7&r=0&o=5&pid=1.7",
            "published": true,
            "__v": 0
        },
        {
            "_id": "64b500903b9acfe518a51eca",
            "title": "Full Stack MERN",
            "description": "harkirat",
            "price": 5999,
            "imageLink": "https://d33g7sdvsfd029.cloudfront.net/subject/2023-01-17-0.3698267942851394.jpg",
            "published": true,
            "__v": 0
        },
        {
            "_id": "64b5b1cf030c38aba1d47ed1",
            "title": "testAdmin",
            "description": "test",
            "price": 25,
            "imageLink": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "published": true,
            "__v": 0
        }
    ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(courses)
}
