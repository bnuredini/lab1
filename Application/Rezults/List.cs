using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;

namespace Application.Rezults
{
    public class List
    {
        public class Query : IRequest<Result<List<ResultDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ResultDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ResultDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var results = await _context.Rezults
                    .ProjectTo<ResultDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ResultDto>>.Success(results);
            }
        }
    }
}