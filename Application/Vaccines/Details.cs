using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Vaccines
{
    public class Details
    {
        public class Query : IRequest<Result<Vaccine>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Vaccine>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Vaccine>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccine = await _context.Vaccines.FindAsync(request.Id);

                return Result<Vaccine>.Success(vaccine);
            }
        }
    }
}