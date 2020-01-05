import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" }) name: string;
  
  @Column({ type: "double precision", default: 0 })
  lastLng: number;
  
  @Column({ type: "double precision", default: 0 })
  lastLat: number;
  
  @Column({ type: "text" }) address: string;
  
  @Column({ type: "boolean", default: false })
  isFavor: boolean

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Place;
