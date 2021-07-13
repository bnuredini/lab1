using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Doctors
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Doctor Doctor { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Doctor).SetValidator(new DoctorValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Doctors.Add(request.Doctor);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Doctor creation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}