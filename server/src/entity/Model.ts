import { classToPlain } from "class-transformer";
import {
  BeforeInsert,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

export default abstract class Model {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUuid(): void {
    this.uuid = uuid();
  }

  constructor(model?: Partial<any>) {
    Object.assign(this, model);
  }

  toJSON() {
    return classToPlain(this);
  }
}
