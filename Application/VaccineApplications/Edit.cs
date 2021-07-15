using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.VaccineApplications
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public VaccineApplication VaccineApplication { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.VaccineApplication).SetValidator(new VaccineApplicationValidator());
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
                var vaccineApplication = await _context.VaccineApplications.FindAsync(request.VaccineApplication.Id);
                if (vaccineApplication == null) return null;

                _mapper.Map(request.VaccineApplication, vaccineApplication);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during application updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}