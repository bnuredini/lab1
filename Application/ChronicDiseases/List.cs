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

namespace Application.ChronicDiseases
{
    public class List
    {
        public class Query : IRequest<Result<List<ChronicDiseaseDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ChronicDiseaseDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ChronicDiseaseDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chronicDisease = await _context.Chronic_Diseases
                    .ProjectTo<ChronicDiseaseDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ChronicDiseaseDto>>.Success(chronicDisease);
            }
        }
    }
}