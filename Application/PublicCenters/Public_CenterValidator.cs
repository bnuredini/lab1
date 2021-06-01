using Domain;
using FluentValidation;

namespace Application.PublicCenters
{
    public class Public_CenterValidator : AbstractValidator<Public_Center>
    {
       public Public_CenterValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
           RuleFor(x => x.Location).NotEmpty();
       } 
    }
}