using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ChronicDiseases
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Chronic_Disease Chronic_Disease { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() {
                RuleFor(x => x.Chronic_Disease).SetValidator(new Chronic_DiseaseValidator());
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
                var chronic_Disease = await _context.Chronic_Diseases.FindAsync(request.Chronic_Disease.Id);
                if (chronic_Disease == null) return null;

                _mapper.Map(request.Chronic_Disease, chronic_Disease);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during chronic disease updation");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}