using Domain;
using FluentValidation;

namespace Application.Doctors
{
    public class DoctorValidator : AbstractValidator<Doctor>
    {
       public DoctorValidator()
       {
          
           RuleFor(x => x.Type).NotEmpty();

       } 
    }
}