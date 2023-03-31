import User from "@models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dbConnect from "@db/MongoDb/mongoConnect";

import { UserData } from "@lib/types/user";

export default async function handler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (req.method !== "POST")
      throw new Error(`Unsupported method: ${req.method}`);
    await dbConnect();

    await login(req, res);
  } catch (error) {
    throw(error)
    // replace with default handler
  }
  return;
}

async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ errorMessage: "All fields are required" });
    }

    let user: any = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (!user) {
      user = await User.findOne({ email: username })
        .collation({ locale: "en", strength: 2 })
        .exec();
    }

    if (!user) {
      return res.status(401).json({ errorMessage: "User does not exist." });
    }

    // check if the user is verified

    if (!user.verified) {
      // handle here when user is not verified
    }

    const match = bcryptjs.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ errorMessage: "invalid password" });
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: user.username,
          id: user._id,
          roles: user.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "900sec" }
    );

    const refreshToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "30d" }
    );

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   // secure: true,
    //   // uncomment in production
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    type userDataType = Omit<UserData, "password">;
    
    const userData:userDataType = user;
 
    return res.json({ ...userData, accessToken });
  } catch (error: any) {
    throw(error)
  }
}
