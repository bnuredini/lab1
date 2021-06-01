using Domain;
using FluentValidation;

namespace Application.Rezults
{
    public class RezultValidator : AbstractValidator<Rezult>
    {
       public RezultValidator()
       {
           RuleFor(x => x.Result).NotEmpty();
          
       } 
    }
}