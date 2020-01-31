import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
  // ManyToOne
} from "typeorm";
import { verificationTarget } from "src/types/types";
// import User from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";
@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: verificationTarget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  verified: boolean;

  // @Column({ type: "boolean", default: false }) used: boolean;

  // @ManyToOne(
  //   type => User,
  //   user => user.verifications,
  //   {nullable: true}
  // )
  // user: User;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @BeforeInsert()
  createKey(): void {
    console.log("Creating key");
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 1000).toString();
    } else {
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}
export default Verification;
