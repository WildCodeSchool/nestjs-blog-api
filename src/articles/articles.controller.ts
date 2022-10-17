import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Article } from './article.entity';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private service: ArticlesService) {}

  @Get(':id')
  get(@Param() params) {
    return this.service.getArticle(params.id);
  }

  @Get()
  getAll() {
    return this.service.getArticles();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() article: Article, @Request() req) {
    const articleCreated: Article = await this.service.saveArticle(
      article,
      req.user,
    );
    delete articleCreated.author.password;
    return articleCreated;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() article: Article) {
    const articleSaved: Article = await this.service.saveArticle(article);
    delete articleSaved.author.password;
    return articleSaved;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param() params) {
    this.service.deleteArticle(params.id);
    return;
  }
}
