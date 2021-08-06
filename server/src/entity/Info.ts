import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { File } from "./File";
import Model from "./Model";
import { User } from "./User";

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
  @IsString()
  title: string;

  @Column({ default: "unknown" })
  @IsString()
  place: Place;

  @ManyToOne(() => User, (user) => user.infos, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => File, (file) => file.info)
  files: File[];
}
