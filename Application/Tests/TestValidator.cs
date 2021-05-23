using Domain;
using FluentValidation;

namespace Application.Tests
{
    public class TestValidator : AbstractValidator<Test>
    {
       public TestValidator()
       {
           RuleFor(x => x.Description).NotEmpty();
           RuleFor(x => x.Date).NotEmpty();
           RuleFor(x => x.VaccineId).NotEmpty();
           RuleFor(x => x.Variation).NotEmpty();
       } 
    }
}