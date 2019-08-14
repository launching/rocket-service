import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Group } from "../entity/Group";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let group = new Group();
    group.name = "admin";
    group.description = "admin";
    const groupRepository = getRepository(Group);
    await groupRepository.save(group);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
