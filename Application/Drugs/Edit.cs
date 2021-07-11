using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Drugs
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Drug Drug { get; set; }

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
                var drug = await _context.Drugs.FindAsync(request.Drug.Id);

                _mapper.Map(request.Drug, drug);
                
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}