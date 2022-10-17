import { Article } from '../articles/article.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 80, nullable: true })
  firstname: string;

  @Column({ length: 80, nullable: true })
  lastname: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
