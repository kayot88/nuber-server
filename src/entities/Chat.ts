import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";

import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @OneToMany(
    type => Message,
    message => message.chat
  )
  messages: Message[];
  
  @Column({nullable: true})
  passengerId

  @Column({nullable: true})
  driverId

  @ManyToOne(
    type => User,
    user => user.chatsAsPassenger
  )
  passenger: User;

  @ManyToOne(
    type => User,
    user => user.chatsAsDriver
  )
  driver: User;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Chat;
