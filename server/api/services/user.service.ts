import { User } from "../entity/User";
import l from "../../common/logger";
import { getRepository, Equal } from "typeorm";

let userRepository = getRepository(User);
userRepository.clear()
export class UserService {
  async create(user: User): Promise<boolean> {
    let users = await this.findByLoginName(user.loginName);
    if (!user || users.length <= 0) {
      user.hashPassword();
      let result = await userRepository.save(user);
      l.info(`create ${result.loginName} success`);
      return true;
    }

    return false;
  }

  async all(): Promise<User[]> {
    return await userRepository.find()
  }

  async findById(user: User): Promise<User> {
    return await userRepository.findOne(user.id);
  }

  async findByLoginName(loginName: string): Promise<User[]> {
    return await userRepository.find({ loginName: Equal(loginName) });
  }
}

export default new UserService();
