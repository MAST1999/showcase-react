import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Place } from "../../../shared/enums";
import { Info } from "../entity/Info";
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

  async updateCheckboxes(
    infoUuid: string,
    checkboxes: number[],
    descCheckboxOne?: string,
    descCheckboxTwo?: string,
    descCheckboxThree?: string
  ) {
    try {
      const info = await this.manager.findOne(Info, { uuid: infoUuid });

      if (!info) return { message: `Info doesn't exist` };

      checkboxes.length === 0
        ? (info.checkboxes = 0)
        : (info.checkboxes = checkboxes.reduce((a, b) => a * b));

      if (descCheckboxOne === "" || descCheckboxOne)
        info.descCheckboxOne = descCheckboxOne;
      if (descCheckboxTwo === "" || descCheckboxTwo)
        info.descCheckboxTwo = descCheckboxTwo;
      if (descCheckboxThree === "" || descCheckboxThree)
        info.descCheckboxThree = descCheckboxThree;

      return this.manager.save(info);
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
}
