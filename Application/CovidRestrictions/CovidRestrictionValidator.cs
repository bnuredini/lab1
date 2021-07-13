using Domain;
using FluentValidation;

namespace Application.CovidRestrictions
{
    public class CovidRestrictionValidator : AbstractValidator<CovidRestriction>
    {
       public CovidRestrictionValidator()
       {
           RuleFor(x => x.Type).NotEmpty();
           RuleFor(x => x.From).NotEmpty();
           RuleFor(x => x.Until).NotEmpty();
         } 
    }
}