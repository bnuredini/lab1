using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Tests
{
    public class List
    {
        public class Query : IRequest<List<Test>> { }

        public class Handler : IRequestHandler<Query, List<Test>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Test>> Handle(Query request, CancellationToken cancellationToken)
            {
                // return await _context.Tests.ToListAsync(cancellationToken);
                return await _context.Tests.ToListAsync();
            }
        }
    }
}