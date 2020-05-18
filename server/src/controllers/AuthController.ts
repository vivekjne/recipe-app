import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json({ message: "Please send all fields" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).json({ message: "Login Failed!" });
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "6h" }
    );

    res.status(200).json({ token });
  };

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: "Please send all fields!" });
    }

    const userRepository = getRepository(User);

    let user: User;

    try {
      user = await userRepository.findOneOrFail(id);
    } catch (err) {
      res.status(401).json({ message: "Couldnt find user with id" + id });
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).json({ message: "Incorrect old password" });
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}

export default AuthController;
