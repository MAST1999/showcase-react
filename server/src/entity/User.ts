import { Exclude } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { File } from "./File.js";
import { Info } from "./Info.js";
import Model from "./Model.js";

@Entity("users")
export class User extends Model {
  @Column({ unique: true })
  @Length(4, 20)
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @IsString()
  password: string;

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => Info, (info) => info.user)
  infos: Info[];
}
