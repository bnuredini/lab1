using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tests
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Test Test { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Test).SetValidator(new TestValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());

                if (user == null) {
                    return Result<Unit>.Failure("User is null");
                }

                // var user = new AppUser() {
                //     DisplayName = "Isuf",
                //     Bio = "Doktor nga Shqiperia",
                //     Role = "Doktor",
                //     Tests = null,
                //     ChronicDisease = null,
                //     Articles = null,
                //     Vaccines = null,
                //     Allergies = null
                // };

                request.Test.AppUser = user;
                var testToReturn =  new Test() {
                    Id = request.Test.Id,
                    Date = request.Test.Date,
                    Description = request.Test.Description,
                    Result = request.Test.Result,
                    AppUser = user
                };

                _context.Tests.Add(testToReturn);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during test creation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}