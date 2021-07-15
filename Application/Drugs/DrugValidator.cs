using Domain;
using FluentValidation;

namespace Application.Drugs
{
    public class DrugValidator : AbstractValidator<Drug>
    {
       public DrugValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
           RuleFor(x => x.Type).NotEmpty();
           RuleFor(x => x.SideEffects).NotEmpty();
           RuleFor(x => x.Description).NotEmpty();

       } 
    }
}