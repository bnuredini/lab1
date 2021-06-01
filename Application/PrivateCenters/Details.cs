using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.PrivateCenters
{
    public class Details
    {
        public class Query : IRequest<Result<Private_Center>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Private_Center>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Private_Center>> Handle(Query request, CancellationToken cancellationToken)
            {
                var private_Center = await _context.Private_Centers.FindAsync(request.Id);

                return Result<Private_Center>.Success(private_Center);
            }
        }
    }
}