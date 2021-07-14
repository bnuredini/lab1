using Domain;
using FluentValidation;

namespace Application.TestConfirmations
{
    public class TestConfirmationValidator : AbstractValidator<TestConfirmation>
    {
       public TestConfirmationValidator()
       {
           RuleFor(x => x.Email).NotEmpty();
           RuleFor(x => x.Date).NotEmpty();
           RuleFor(x => x.TestName).NotEmpty();
           RuleFor(x => x.Location).NotEmpty();
       } 
    }
}