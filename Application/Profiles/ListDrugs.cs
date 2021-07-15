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
    public class ListDrugs
    {
        public class Query : IRequest<Result<List<PatientDrugDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientDrugDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientDrugDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientDrugs
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Drug.Type)
                    .ProjectTo<PatientDrugDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var drugs = await query.ToListAsync();

                return Result<List<PatientDrugDto>>.Success(drugs);
            }
        }
    }
}