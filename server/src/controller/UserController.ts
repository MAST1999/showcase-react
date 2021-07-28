import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";

export class UserController {
  private userRepository = getCustomRepository(UserRepository);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.find({ relations: ["infos", "files"] });
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(req.params["uuid"], {
      relations: ["infos"],
    });
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(req.params["id"]);
    if (userToRemove) await this.userRepository.remove(userToRemove);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { username, password, email } = req.body;
    return this.userRepository.createAndSave(username, password, email);
  }

  async defaultUser(req: Request, res: Response, next: NextFunction) {
    return this.userRepository.findOne(
      { username: "mast" },
      { relations: ["infos", "files"] }
    );
  }
}
