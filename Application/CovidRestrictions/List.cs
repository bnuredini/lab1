using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CovidRestrictions
{
    public class List
    {
        public class Query : IRequest<Result<List<CovidRestriction>>> { }

        public class Handler : IRequestHandler<Query, Result<List<CovidRestriction>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<CovidRestriction>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<CovidRestriction>>.Success(await _context.CovidRestrictions.ToListAsync());
            }
        }
    }
}