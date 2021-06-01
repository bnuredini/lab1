using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Variations
{
    public class List
    {
        public class Query : IRequest<Result<List<Variation>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Variation>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Variation>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Variation>>.Success(await _context.Variations.ToListAsync());
            }
        }
    }
}