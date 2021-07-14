using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.VaccineConfirmations
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vaccineConfirmation = await _context.VaccineConfirmations.FindAsync(request.VaccineConfirmation.Id);
                if (vaccineConfirmation == null) return null;

                _mapper.Map(request.VaccineConfirmation, vaccineConfirmation);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Vaccine Confirmation updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}