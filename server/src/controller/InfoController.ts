import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { InfoRepository } from "../repository/InfoRepository";

export class InfoController {
  private infoRepository = getCustomRepository(InfoRepository);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.infoRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.infoRepository.findOne({ uuid: req.params["uuid"] });
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const infoToRemove = await this.infoRepository.findOne(req.params["uuid"]);
    if (infoToRemove) await this.infoRepository.remove(infoToRemove);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { title, place } = req.body;
    const userUuid = req.params["uuid"]!;

    return this.infoRepository.createAndSave(title, place, userUuid);
  }
}
