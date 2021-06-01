using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Variations
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Variation Variation { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Variation).SetValidator(new VariationValidator());
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
                var variation = await _context.Variations.FindAsync(request.Variation.Id);
                if (variation == null) return null;

                _mapper.Map(request.Variation, variation);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during variation updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}