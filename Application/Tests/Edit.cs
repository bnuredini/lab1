using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Tests
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Test Test { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Test).SetValidator(new TestValidator());
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
                var test = await _context.Tests.FindAsync(request.Test.Id);
                if (test == null) return null;

                _mapper.Map(request.Test, test);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during test updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}