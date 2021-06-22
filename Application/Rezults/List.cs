using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rezults
{
    public class List
    {
        public class Query : IRequest<Result<List<Rezult>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Rezult>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Rezult>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Rezult>>.Success(await _context.Rezults
                .Include(x=>x.Variations)
                .ToListAsync());
            }
        }
    }
}