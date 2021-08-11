import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { File } from "../entity/File";
import { Info } from "../entity/Info";
import { User } from "../entity/User";
import { isQueryFailedError } from "../queryErrorHandling";
import { InfoRepository } from "./InfoRepository";
import { UserRepository } from "./UserRepository";

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  private userRepository = getCustomRepository(UserRepository);
  private infoRepository = getCustomRepository(InfoRepository);

  async createAndSave(
    filename: string,
    link: string,
    userUuid: string,
    infoUuid: string,
    description?: string
  ) {
    try {
      const user = await this.userRepository.findOne({ uuid: userUuid });
      if (!user) return { message: "User doesn't exist" };

      const info = await this.infoRepository.findOne({ uuid: infoUuid });
      if (!info) return { message: "Info doesn't exist" };

      const file = new File();
      file.filename = filename;
      file.link = link;
      file.description = description || file.description;
      file.user = user;
      file.info = info;

      await this.manager.save(File, file);
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in File Repo",
          type: "Database",
          func: "createAndSave",
          err: err,
        };
      } else {
        return {
          message: "Error in File Repo",
          type: "Other",
          func: "createAndSave",
          err: err,
        };
      }
    }
    return new Promise((resolve, reject) => {
      resolve({ message: "successful" });
    });
  }

  async updateDescription(
    uuid: string,
    userUuid: string,
    infoUuid: string,
    description: string
  ) {
    try {
      const file = await this.manager.findOne(File, {
        uuid,
        user: { uuid: userUuid },
        info: { uuid: infoUuid },
      });
      const user = await this.manager.findOne(User, { uuid: userUuid });
      const info = await this.manager.findOne(Info, { uuid: infoUuid });
      if (!file || !user || !info) return { message: "File doesn't exist" };

      file.description = description;
      file.user = user;
      file.info = info;

      return this.manager.save(File, file);
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in File Repo",
          type: "Database",
          func: "updateDescription",
          err: err,
        };
      } else {
        return {
          message: "Error in File Repo",
          type: "Other",
          func: "updateDescription",
          err: err,
        };
      }
    }
  }

  async getFiles(infoUuid: string) {
    try {
      const info = await this.infoRepository.findOne(
        { uuid: infoUuid },
        { relations: ["files"] }
      );
      return info?.files;
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in File Repo",
          type: "Database",
          func: "updateDescription",
          err: err,
        };
      } else {
        return {
          message: "Error in File Repo",
          type: "Other",
          func: "updateDescription",
          err: err,
        };
      }
    }
  }

  async updateCheckbox(fileUuid: string, version: string, typeOfFile: string) {
    try {
      const file = await this.manager.findOne(File, { uuid: fileUuid });

      if (!file) return { message: "File doesn't exist" };

      file.version = +version;
      file.type = +typeOfFile;

      return this.manager.save(file);
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in File Repo",
          type: "Database",
          func: "updateCheckbox",
          err: err,
        };
      } else {
        return {
          message: "Error in File Repo",
          type: "Other",
          func: "updateCheckbox",
          err: err,
        };
      }
    }
  }

  async updateNumber(fileUuid: string, number: string) {
    try {
      const file = await this.manager.findOne(File, { uuid: fileUuid });

      if (!file) return { message: "File doesn't exist" };

      file.number = +number;

      return this.manager.save(file);
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in File Repo",
          type: "Database",
          func: "updateNumber",
          err: err,
        };
      } else {
        return {
          message: "Error in File Repo",
          type: "Other",
          func: "updateNumber",
          err: err,
        };
      }
    }
  }
}
