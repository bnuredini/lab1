using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Drugs
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Drug Drug { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Drug).SetValidator(new DrugValidator());
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
                var drug = await _context.Drugs.FindAsync(request.Drug.Id);
                if (drug == null) return null;

                _mapper.Map(request.Drug, drug);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during drug updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}