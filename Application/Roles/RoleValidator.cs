using Domain;
using FluentValidation;

namespace Application.Roles
{
    public class RoleValidator : AbstractValidator<Position>
    {
       public RoleValidator()
       {
           RuleFor(x => x.RoleName).NotEmpty();
           RuleFor(x => x.Responsibility).NotEmpty();
       } 
    }
}