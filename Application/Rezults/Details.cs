using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Rezults
{
    public class Details
    {
        public class Query : IRequest<Result<Rezult>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Rezult>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Rezult>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rezult = await _context.Rezults.FindAsync(request.Id);

                return Result<Rezult>.Success(rezult);
            }
        }
    }
}