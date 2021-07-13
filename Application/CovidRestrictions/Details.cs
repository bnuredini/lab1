using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.CovidRestrictions
{
    public class Details
    {
        public class Query : IRequest<Result<CovidRestriction>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CovidRestriction>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<CovidRestriction>> Handle(Query request, CancellationToken cancellationToken)
            {
                var covidRestriction = await _context.CovidRestrictions.FindAsync(request.Id);

                return Result<CovidRestriction>.Success(covidRestriction);
            }
        }
    }
}