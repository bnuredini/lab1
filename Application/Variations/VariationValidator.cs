using Domain;
using FluentValidation;

namespace Application.Variations
{
    public class VariationValidator : AbstractValidator<Variation>
    {
       public VariationValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
          
       } 
    }
}