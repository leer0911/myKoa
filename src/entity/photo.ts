import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  filename: string;
  @Column()
  views: number;
  @Column()
  isPublished: boolean;
  constructor() {
    this.name = 'name';
    this.description = 'description';
    this.filename = 'filename';
    this.views = 1;
    this.isPublished = true;
  }
}
