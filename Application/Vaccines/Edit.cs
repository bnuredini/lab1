using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Vaccines
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Vaccine Vaccine { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Vaccine).SetValidator(new VaccineValidator());
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
                var vaccine = await _context.Vaccines.FindAsync(request.Vaccine.Id);
                if (vaccine == null) return null;

                _mapper.Map(request.Vaccine, vaccine);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Vaccine updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}