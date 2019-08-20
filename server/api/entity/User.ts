import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn
} from "typeorm";

const SALT = 10;

@Entity("t_user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  loginName: string;

  @Column()
  password: string;

  @Column({default: 'admin'})
  role: string;

  @Column()
  vsername: string;

  @Column()
  mobile: string = "";

  @Column()
  email: string = "";

  @Column()
  createTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;

  @Column()
  lastLoginTime: Date = new Date();

  @BeforeInsert()
  setCreateTime() {
    const time = new Date();
    this.createTime = time;
    if (!this.lastLoginTime) {
      this.lastLoginTime = this.createTime;
    }
  }

  @BeforeInsert() 
  setDefaultVserName () {
    this.vsername = this.vsername || this.loginName;
  }

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, SALT);
  }

  async compareHash(password: string, hash: string | undefined) {
    return bcrypt.compare(password, hash);
  }
}
