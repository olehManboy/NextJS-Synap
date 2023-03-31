import { Request, Response } from "express";
import User from "@models/User";
import bcryptjs from "bcryptjs";
import Joi from "joi";
import randomstring from "randomstring";
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

    await create(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    // replace with default handler
  }
  return;
}

async function create(req: Request, res: Response): Promise<Response> {
  try {
    const {
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      gender,
      dateOfBirth,
    } = req.body;

    if (
      !username ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !gender ||
      !dateOfBirth
    ) {
      return res.status(400).json({ errorMessage: "all fields are required" });
    }

    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .pattern(
          new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        )
        .required(),
      firstName: Joi.string().min(3).max(20).required(),
      lastName: Joi.string().min(3).max(20).required(),
      password: Joi.string().min(5).max(20).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = schema.validate({
      username,
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    });

    if (error) {
      return res.status(400).send({});
    }

    const duplicateUsername = await User.findOne({ username })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicateUsername) {
      return res.status(409).json({ errorMessage: "The username already exist." });
    }

    const duplicateEmail = await User.findOne({ email })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicateEmail) {
      return res.status(409).json({ errorMessage: "The email already exist." });
    }

    const salt = bcryptjs.genSaltSync(10);

    const hashedPassword = bcryptjs.hashSync(password, salt);

    const userObject = {
      username,
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      password: hashedPassword,
    };
    type userDataType = Omit<UserData, "password">;

    const user: userDataType = await User.create(userObject);

    if (!user) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    console.log(user);
    // Return the user object as a response
    return res.status(202).json(user);
  } catch (error: any) {
    return res.status(500).json({ errorMessage: error?.message });
  }
}
