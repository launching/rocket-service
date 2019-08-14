import { Group } from "../entity/Group";
import { getRepository, Equal } from "typeorm";
import l from "../../common/logger";

let groupRepository = getRepository(Group);
groupRepository.clear();
export class GroupService {
  async create(group: Group): Promise<boolean> {
    let groups = await this.findByName(group.name);
    if (!groups || groups.length <= 0) {
      let result = await groupRepository.save(group);
      l.info(`create ${result.name} success`);
      return true;
    }

    return false;
  }

  async findByName(name: string): Promise<Group[]> {
    return await groupRepository.find({ name: Equal(name) });
  }
}
