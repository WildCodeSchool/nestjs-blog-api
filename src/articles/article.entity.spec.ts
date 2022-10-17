import { Article } from './article.entity';

describe('Article', () => {
  it('should be defined', () => {
    expect(new Article()).toBeDefined();
  });
});
