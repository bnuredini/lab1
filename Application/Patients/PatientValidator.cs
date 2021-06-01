using Domain;
using FluentValidation;
using FluentValidation.Validators;

namespace Application.Patients
{
    public class PatientValidator : AbstractValidator<Patient>
    {
       public PatientValidator()
       {
           RuleFor(x => x.Full_Name).NotEmpty();
           RuleFor(x => x.Birthday).NotEmpty();
           RuleFor(x => x.Gender).NotEmpty();
           RuleFor(x => x.Phone_Number).NotEmpty();
           RuleFor(x => x.Email).NotEmpty();
           RuleFor(x => x.Address).NotEmpty();
       } 
    }
}