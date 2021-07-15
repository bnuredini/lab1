using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.VaccineConfirmations
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public VaccineConfirmation VaccineConfirmation { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.VaccineConfirmation).SetValidator(new VaccineConfirmationValidator());
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
                _context.VaccineConfirmations.Add(request.VaccineConfirmation);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Vaccine Confirmation creation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}