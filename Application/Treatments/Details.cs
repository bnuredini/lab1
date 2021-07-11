using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Treatments
{
    public class Details
    {
        public class Query : IRequest<Result<Treatment>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Treatment>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Treatment>> Handle(Query request, CancellationToken cancellationToken)
            {
                var treatment = await _context.Treatments.FindAsync(request.Id);

                return Result<Treatment>.Success(treatment);
            }
        }
    }
}