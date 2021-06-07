using Domain;
using FluentValidation;

namespace Application.Articles
{
    public class ArticleValidator : AbstractValidator<Article>
    {
       public ArticleValidator()
       {
           RuleFor(x => x.Title).NotEmpty();
           RuleFor(x => x.Summary).NotEmpty();
           RuleFor(x => x.Content).NotEmpty();
           
       } 
    }
}