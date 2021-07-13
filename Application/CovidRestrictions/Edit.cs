using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.CovidRestrictions
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CovidRestriction CovidRestriction { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.CovidRestriction).SetValidator(new CovidRestrictionValidator());
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
                var covidRestriction = await _context.CovidRestrictions.FindAsync(request.CovidRestriction.Id);
                if (covidRestriction == null) return null;

                _mapper.Map(request.CovidRestriction, covidRestriction);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Covid restriction updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}