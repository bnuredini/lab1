using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.PublicCenters
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Public_Center Public_Center { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Public_Center).SetValidator(new Public_CenterValidator());
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
                var public_Center = await _context.Public_Centers.FindAsync(request.Public_Center.Id);
                if (public_Center == null) return null;

                _mapper.Map(request.Public_Center, public_Center);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during center updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}