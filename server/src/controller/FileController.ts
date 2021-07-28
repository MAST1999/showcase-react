import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { FileRepository } from "../repository/FileRepository";
import { InfoRepository } from "../repository/InfoRepository";

export class FileController {
  // private userRepository = getCustomRepository(UserRepository);
  private infoRepository = getCustomRepository(InfoRepository);
  private fileRepository = getCustomRepository(FileRepository);

  async all(req: Request, res: Response, next: NextFunction) {
    return this.fileRepository.find();
  }

  async one(req: Request, res: Response, next: NextFunction) {
    return this.fileRepository.findOne({ uuid: req.params["uuid"] });
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    const { uuid, userUuid, infoUuid } = req.params;
    const file = await this.fileRepository.findOne(
      {
        uuid,
        user: { uuid: userUuid },
        info: { uuid: infoUuid },
      },
      { relations: ["user", "info"] }
    );
    if (file) return this.fileRepository.remove(file);
    return { message: "file doesn't exist", file: file };
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { title, place } = req.body;
    const userUuid = req.params["uuid"]!;

    return this.infoRepository.createAndSave(title, place, userUuid);
  }

  async file(req: Request, res: Response, next: NextFunction) {
    const { userUuid, infoUuid, description } = req.body;

    const results = [];
    if (req.files && Array.isArray(req.files))
      for (const file of req.files) {
        results.push(
          this.fileRepository.createAndSave(
            file.filename,
            `http://localhost:5000/uploads/${file.filename}`,
            userUuid,
            infoUuid,
            description
          )
        );
      }
    return results;
  }

  async sendFiles(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      if (uuid) {
        const files = this.fileRepository.getFiles(uuid);

        return files;
      } else {
        return null;
      }
    } catch (err) {
      console.log({ err });
      return {
        message: "error in sendFiles",
      };
    }
  }

  async desc(req: Request, res: Response, next: NextFunction) {
    const { uuid, userUuid, infoUuid } = req.params;
    const { description } = req.body;

    if (uuid && userUuid && infoUuid) {
      return this.fileRepository.updateDescription(
        uuid,
        userUuid,
        infoUuid,
        description
      );
    } else {
      return { message: "incomplete info" };
    }
  }
}
