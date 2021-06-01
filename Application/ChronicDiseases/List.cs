using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ChronicDiseases
{
    public class List
    {
        public class Query : IRequest<Result<List<Chronic_Disease>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Chronic_Disease>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Chronic_Disease>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Chronic_Disease>>.Success(await _context.Chronic_Diseases.ToListAsync());
            }
        }
    }
}