using Domain;
using FluentValidation;

namespace Application.PrivateCenters
{
    public class Private_CenterValidator : AbstractValidator<Private_Center>
    {
       public Private_CenterValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
           RuleFor(x => x.Location).NotEmpty();
       } 
    }
}