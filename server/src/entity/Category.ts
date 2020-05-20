import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Length, isNotEmpty, IsNotEmpty, Min } from "class-validator";

@Entity()
@Unique(["category_name"])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 50)
  category_name: string;

  @Column()
  category_image: string;

  @Column({ type: "text" })
  @IsNotEmpty()
  @Length(10)
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  @DeleteDateColumn()
  deleted_at: Date;
}
