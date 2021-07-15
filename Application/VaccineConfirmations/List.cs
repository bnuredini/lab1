using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.VaccineConfirmations
{
    public class List
    {
        public class Query : IRequest<Result<List<VaccineConfirmation>>> { }

        public class Handler : IRequestHandler<Query, Result<List<VaccineConfirmation>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<VaccineConfirmation>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<VaccineConfirmation>>.Success(await _context.VaccineConfirmations.ToListAsync());
            }
        }
    }
}