import { classToPlain, Exclude } from "class-transformer";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

export default abstract class Model extends BaseEntity {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
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
    super();

    Object.assign(this, model);
  }

  toJSON() {
    return classToPlain(this);
  }
}
