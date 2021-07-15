using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.VaccineConfirmations
{
    public class Details
    {
        public class Query : IRequest<Result<VaccineConfirmation>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<VaccineConfirmation>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<VaccineConfirmation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccineConfirmation = await _context.VaccineConfirmations.FindAsync(request.Id);

                return Result<VaccineConfirmation>.Success(vaccineConfirmation);
            }
        }
    }
}