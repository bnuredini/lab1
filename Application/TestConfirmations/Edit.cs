using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.TestConfirmations
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TestConfirmation TestConfirmation { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.TestConfirmation).SetValidator(new TestConfirmationValidator());
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
                var testConfirmation = await _context.TestConfirmations.FindAsync(request.TestConfirmation.Id);
                if (testConfirmation == null) return null;

                _mapper.Map(request.TestConfirmation, testConfirmation);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Test Confirmation updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}