using Domain;
using FluentValidation;

namespace Application.Treatments
{
    public class TreatmentValidator : AbstractValidator<Treatment>
    {
       public TreatmentValidator()
       {
           RuleFor(x => x.Description).NotEmpty();
           RuleFor(x => x.Date).NotEmpty();
           RuleFor(x => x.Patient).NotEmpty();
           RuleFor(x => x.Doctor).NotEmpty();
       } 
    }
}