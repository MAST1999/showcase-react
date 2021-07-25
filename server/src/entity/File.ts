import { IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { Info } from "./Info.js";
import Model from "./Model.js";
import { User } from "./User.js";

@Entity("files")
export class File extends Model {
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Column({ unique: true })
  @IsString()
  filename: string;

  @Column()
  @IsString()
  link: string;

  @ManyToOne(() => User, (user) => user.files, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Info, (info) => info.files, { onDelete: "CASCADE" })
  info: Info;
}
