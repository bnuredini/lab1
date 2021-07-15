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

namespace Application.Drugs
{
    public class List
    {
        public class Query : IRequest<Result<List<DrugDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DrugDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<DrugDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var drug = await _context.Drugs
                    .ProjectTo<DrugDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<DrugDto>>.Success(drug);
            }
        }
    }
}