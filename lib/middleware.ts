import { SECRET } from "@/config";
import jwt from "jsonwebtoken";

export const authenticateJwt = (token: string, callback) => {

      jwt.verify(token, SECRET!, (err, user) => {
        if (err) {
          return callback(null);
        }
        return callback(user)
    });

  }