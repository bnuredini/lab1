using Domain;
using FluentValidation;

namespace Application.Vaccines
{
    public class VaccineValidator : AbstractValidator<Vaccine>
    {
       public VaccineValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
           RuleFor(x => x.Efficacy).NotEmpty();
           RuleFor(x => x.Creator).NotEmpty();
           RuleFor(x => x.Type).NotEmpty();
       } 
    }
}