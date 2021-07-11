using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Drugs
{
    public class List
    {
        public class Query : IRequest<List<Drug>> { }

        public class Handler : IRequestHandler<Query, List<Drug>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Drug>> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Drugs.ToListAsync();
            }
        }
    }
}