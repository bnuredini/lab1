using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Drugs
{

    public class Details
    {
        public class Query : IRequest<Drug>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Drug>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Drug> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Drugs.FindAsync(request.Id);
            }
        }
    }
}