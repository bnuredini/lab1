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

namespace Application.VaccineApplications
{
    public class List
    {
        public class Query : IRequest<Result<List<ApplicationDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ApplicationDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ApplicationDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccineApplication = await _context.VaccineApplications
                    .ProjectTo<ApplicationDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ApplicationDto>>.Success(vaccineApplication);
            }
        }
    }
}