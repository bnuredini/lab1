using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Allergy Allergy { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Allergy).SetValidator(new AllergyValidator());
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
                var allergy = await _context.Allergies.FindAsync(request.Allergy.Id);
                if (allergy == null) return null;

                _mapper.Map(request.Allergy, allergy);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during allergy updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}