using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergies
{
    public class List
    {
        public class Query : IRequest<Result<List<AllergyDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AllergyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<AllergyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var allergy = await _context.Allergies
                                    .ProjectTo<AllergyDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync(cancellationToken);

                return Result<List<AllergyDto>>.Success(allergy);
            }
        }
    }
}