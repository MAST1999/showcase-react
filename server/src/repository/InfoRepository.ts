import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Info, Place } from "../entity/Info";
import { isQueryFailedError } from "../queryErrorHandling";
import { UserRepository } from "./UserRepository";

@EntityRepository(Info)
export class InfoRepository extends Repository<Info> {
  async createAndSave(title: string, place: Place, userUuid: string) {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.findOne({ uuid: userUuid });

      if (!user) return { message: "User not found" };

      const info = new Info();
      info.title = title;
      info.place = place;
      info.user = user;
      return this.manager.save(info);
    } catch (err) {
      if (isQueryFailedError(err)) {
        return {
          message: "Error in Info Repo",
          type: "Database",
          func: "createAndSave",
          err: err,
        };
      } else {
        return {
          message: "Error in Info Repo",
          type: "Other",
          func: "createAndSave",
          err: err,
        };
      }
    }
  }
}
