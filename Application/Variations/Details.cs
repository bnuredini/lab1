using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Variations
{
    public class Details
    {
        public class Query : IRequest<Result<Variation>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Variation>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Variation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var variation = await _context.Variations.FindAsync(request.Id);

                return Result<Variation>.Success(variation);
            }
        }
    }
}