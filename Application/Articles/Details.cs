using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Articles
{
    public class Details
    {
        public class Query : IRequest<Result<Article>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Article>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Article>> Handle(Query request, CancellationToken cancellationToken)
            {
                var article = await _context.Articles.FindAsync(request.Id);

                return Result<Article>.Success(article);
            }
        }
    }
}