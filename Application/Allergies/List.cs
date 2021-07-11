using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergies
{
    public class List
    {
        public class Query : IRequest<Result<List<Allergy>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Allergy>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Allergy>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Allergy>>.Success(await _context.Allergies.ToListAsync());
            }
        }
    }
}