using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.VaccineApplications
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public VaccineApplication VaccineApplication { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.VaccineApplication).SetValidator(new VaccineApplicationValidator());
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
                _context.VaccineApplications.Add(request.VaccineApplication);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Vaccine Application creation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}