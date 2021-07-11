using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Treatments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Treatment Treatment { get; set; }

        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var treatment = await _context.Treatments.FindAsync(request.Treatment.Id);

                _mapper.Map(request.Treatment, treatment);
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}