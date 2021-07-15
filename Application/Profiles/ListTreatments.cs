using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListTreatments
    {
        public class Query : IRequest<Result<List<PatientTreatmentDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientTreatmentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientTreatmentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientTreatments
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Treatment.Date)
                    .ProjectTo<PatientTreatmentDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var treatments = await query.ToListAsync();

                return Result<List<PatientTreatmentDto>>.Success(treatments);
            }
        }
    }
}