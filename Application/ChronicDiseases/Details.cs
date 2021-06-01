using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.ChronicDiseases
{
    public class Details
    {
        public class Query : IRequest<Result<Chronic_Disease>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Chronic_Disease>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Chronic_Disease>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chronic_Disease = await _context.Chronic_Diseases.FindAsync(request.Id);

                return Result<Chronic_Disease>.Success(chronic_Disease);
            }
        }
    }
}