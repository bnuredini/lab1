using Domain;
using FluentValidation;

namespace Application.ChronicDiseases
{
    public class Chronic_DiseaseValidator : AbstractValidator<Chronic_Disease>
    {
       public Chronic_DiseaseValidator()
       {
           RuleFor(x => x.Name).NotEmpty();
        
       } 
    }
}