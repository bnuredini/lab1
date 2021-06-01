using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.PrivateCenters
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Private_Center Private_Center { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Private_Center).SetValidator(new Private_CenterValidator());
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
                var private_Center = await _context.Private_Centers.FindAsync(request.Private_Center.Id);
                if (private_Center == null) return null;

                _mapper.Map(request.Private_Center, private_Center);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during center updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}