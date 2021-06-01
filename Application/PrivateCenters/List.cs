using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PrivateCenters
{
    public class List
    {
        public class Query : IRequest<Result<List<Private_Center>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Private_Center>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Private_Center>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Private_Center>>.Success(await _context.Private_Centers.ToListAsync());
            }
        }
    }
}