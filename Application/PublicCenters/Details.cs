using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.PublicCenters
{
    public class Details
    {
        public class Query : IRequest<Result<Public_Center>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Public_Center>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Public_Center>> Handle(Query request, CancellationToken cancellationToken)
            {
                var public_Center = await _context.Public_Centers.FindAsync(request.Id);

                return Result<Public_Center>.Success(public_Center);
            }
        }
    }
}