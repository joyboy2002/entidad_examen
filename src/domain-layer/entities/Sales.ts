import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Car from './Car';

@Entity()
export default class Sales {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
  public id: number;

  @ManyToOne(() => Car)
  @JoinColumn()
  public car: Car;

  @Column({ type: 'double', nullable: false })
  public price: number;

  @Column({ type: 'datetime', nullable: false })
  public soldDate: Date;

  public constructor(id: number, car: Car, price: number, soldDate: Date) {
    this.id = id;
    this.car = car;
    this.price = price;
    this.soldDate = soldDate;
  }
}
