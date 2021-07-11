using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Treatments
{

    public class Details
    {
        public class Query : IRequest<Treatment>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Treatment>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Treatment> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Treatments.FindAsync(request.Id);
            }
        }
    }
}