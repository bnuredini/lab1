using Domain;
using FluentValidation;

namespace Application.Allergies
{
    public class AllergyValidator : AbstractValidator<Allergy>
    {
       public AllergyValidator()
       {
           RuleFor(x => x.Type).NotEmpty();
           RuleFor(x => x.Causes).NotEmpty();
           
       } 
    }
}