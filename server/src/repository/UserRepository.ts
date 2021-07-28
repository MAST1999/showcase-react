import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createAndSave(username: string, password: string, email: string) {
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    return this.manager.save(user);
  }
}
