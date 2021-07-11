using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Allergies
{
    public class Details
    {
        public class Query : IRequest<Result<Allergy>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Allergy>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Allergy>> Handle(Query request, CancellationToken cancellationToken)
            {
                var allergy = await _context.Allergies.FindAsync(request.Id);

                return Result<Allergy>.Success(allergy);
            }
        }
    }
}