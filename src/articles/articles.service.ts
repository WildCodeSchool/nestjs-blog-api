import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private usersRepository: Repository<Article>,
  ) {}

  /**
   * Get all articles
   * @returns a promise of an array of articles
   */
  async getArticles(): Promise<Article[]> {
    return await this.usersRepository.find();
  }

  /**
   * Get an article by its id
   * @param id article id
   * @returns a promise of an article
   */
  async getArticle(id: number): Promise<Article> {
    return await this.usersRepository.findOneBy({ id: id });
  }

  /**
   * Save an article
   * @param article article to save
   * @returns a promise of an article
   */
  saveArticle(article: Article, user: User = null): Promise<Article> {
    if (!article.id) {
      article.author = user;
    }
    return this.usersRepository.save(article);
  }

  /**
   * Delete an article
   * @param id article id to delete
   */
  deleteArticle(id: number): void {
    this.usersRepository.delete(id);
  }
}
