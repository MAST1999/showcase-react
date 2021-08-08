import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToOne } from "typeorm";
import { TypeOfFile, Version } from "../../../shared/enums";
import { Info } from "./Info";
import Model from "./Model";
import { User } from "./User";

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

  @Column({ type: "int", default: 0 })
  @IsNumber()
  number: number;

  @Column({ type: "int", default: 0 })
  @IsNumber()
  version: Version;

  @Column({ type: "int", default: 0 })
  @IsNumber()
  type: TypeOfFile;

  @Column({ default: "" })
  @IsDate()
  date: string;

  @ManyToOne(() => User, (user) => user.files)
  user: User;

  @ManyToOne(() => Info, (info) => info.files, { onDelete: "CASCADE" })
  info: Info;
}
