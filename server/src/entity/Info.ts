import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CheckboxSelection, Place } from "../../../shared/enums";
import { File } from "./File";
import Model from "./Model";
import { User } from "./User";


@Entity("infos")
export class Info extends Model {
  @Column({ nullable: true })
  @IsString()
  title: string;

  @Column({ default: "unknown" })
  @IsString()
  place: Place;

  @Column({ default: 0, nullable: false })
  @IsNumber()
  checkboxes: CheckboxSelection;

  @Column("text", { default: "", nullable: true })
  descCheckboxOne: string;

  @Column("text", { default: "", nullable: true })
  descCheckboxTwo: string;

  @Column("text", { default: "", nullable: true })
  descCheckboxThree: string;

  @Column({ default: "" })
  @IsDate()
  date: string;

  @ManyToOne(() => User, (user) => user.infos, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => File, (file) => file.info)
  files: File[];
}
