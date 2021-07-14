using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.TestConfirmations
{
    public class Details
    {
        public class Query : IRequest<Result<TestConfirmation>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<TestConfirmation>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<TestConfirmation>> Handle(Query request, CancellationToken cancellationToken)
            {
                var testConfirmation = await _context.TestConfirmations.FindAsync(request.Id);

                return Result<TestConfirmation>.Success(testConfirmation);
            }
        }
    }
}