import { IsOptional, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { File } from "./File.js";
import Model from "./Model.js";
import { User } from "./User.js";

export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

@Entity("infos")
export class Info extends Model {
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  title: string;

  @Column({ type: "enum", enum: Place, default: Place.Unknown })
  @IsString()
  list: Place;

  @ManyToOne(() => User, (user) => user.infos)
  user: User;

  @OneToMany(() => File, (file) => file.info)
  files: File[];
}
