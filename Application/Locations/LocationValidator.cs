using Domain;
using FluentValidation;

namespace Application.Locations
{
    public class LocationValidator : AbstractValidator<Location>
    {
       public LocationValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
           RuleFor(x => x.ZipCode).NotEmpty();
           RuleFor(x => x.Infections).NotEmpty();
           RuleFor(x => x.Tested).NotEmpty();
           RuleFor(x => x.Vaccinated).NotEmpty();

       } 
    }
}