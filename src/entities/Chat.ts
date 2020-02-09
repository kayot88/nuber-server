import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne
} from "typeorm";

import Message from "./Message";
import User from "./User";
import Ride from "./Ride";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  rideId: number;

  @OneToOne(
    type => Ride,
    ride => ride.chat
  )
  ride: Ride;

  @OneToMany(
    type => Message,
    message => message.chat
  )
  messages: Message[];

  @Column({ nullable: true })
  passengerId;

  @Column({ nullable: true })
  driverId;

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
