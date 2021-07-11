using Domain;
using FluentValidation;

namespace Application.VaccineApplications
{
    public class VaccineApplicationValidator : AbstractValidator<VaccineApplication>
    {
       public VaccineApplicationValidator()
       {
           RuleFor(x => x.Type).NotEmpty();
           RuleFor(x => x.Date).NotEmpty();
           RuleFor(x => x.Email).NotEmpty();
           RuleFor(x => x.Location).NotEmpty();
       } 
    }
}