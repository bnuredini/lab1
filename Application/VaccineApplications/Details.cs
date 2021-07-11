using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.VaccineApplications
{
    public class Details
    {
        public class Query : IRequest<Result<VaccineApplication>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<VaccineApplication>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<VaccineApplication>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccineApplication = await _context.VaccineApplications.FindAsync(request.Id);

                return Result<VaccineApplication>.Success(vaccineApplication);
            }
        }
    }
}