using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PublicCenters
{
    public class List
    {
        public class Query : IRequest<Result<List<Public_Center>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Public_Center>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Public_Center>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Public_Center>>.Success(await _context.Public_Centers.ToListAsync());
            }
        }
    }
}