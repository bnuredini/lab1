using Domain;
using FluentValidation;

namespace Application.VaccineConfirmations
{
    public class VaccineConfirmationValidator : AbstractValidator<VaccineConfirmation>
    {
       public VaccineConfirmationValidator()
       {
           RuleFor(x => x.Email).NotEmpty();
           RuleFor(x => x.Date).NotEmpty();
           RuleFor(x => x.VaccineName).NotEmpty();
           RuleFor(x => x.Location).NotEmpty();
       } 
    }
}