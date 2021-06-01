using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Rezults
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Rezult Rezult { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Rezult).SetValidator(new RezultValidator());
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
                var rezult = await _context.Rezults.FindAsync(request.Rezult.Id);
                if (rezult == null) return null;

                _mapper.Map(request.Rezult, rezult);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during result updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}