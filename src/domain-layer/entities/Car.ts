import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Car {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
    public id: number;
  
    @Column({ type: 'varchar', length: 20, nullable: false })
    public model: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    public brand: string;
  
    @Column({ type: 'varchar', length: 4, nullable: false })
    public year: number;


    public constructor(id: number, model: string, brand: string, year: number) {
      this.id = id;
      this.model = model;
      this.brand = brand;
      this.year = year;
    }
  }
  