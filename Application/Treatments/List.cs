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

namespace Application.Treatments
{
    public class List
    {
        public class Query : IRequest<Result<List<TreatmentDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TreatmentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TreatmentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var treatment = await _context.Treatments
                    .ProjectTo<TreatmentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<TreatmentDto>>.Success(treatment);
            }
        }
    }
}