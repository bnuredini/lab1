using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.VaccineApplications
{
    public class List
    {
        public class Query : IRequest<Result<List<VaccineApplication>>> { }

        public class Handler : IRequestHandler<Query, Result<List<VaccineApplication>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<VaccineApplication>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<VaccineApplication>>.Success(await _context.VaccineApplications.ToListAsync());
            }
        }
    }
}