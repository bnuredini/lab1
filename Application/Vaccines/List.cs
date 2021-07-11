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

namespace Application.Vaccines
{
    public class List
    {
        public class Query : IRequest<Result<List<VaccineDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<VaccineDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<VaccineDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccines = await _context.Vaccines
                    .ProjectTo<VaccineDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<VaccineDto>>.Success(vaccines);
            }
        }
    }
}