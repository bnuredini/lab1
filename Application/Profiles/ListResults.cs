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
    public class ListResults
    {
        public class Query : IRequest<Result<List<PatientResultDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientResultDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientResultDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientResults
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Result.Result)
                    .ProjectTo<PatientResultDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                
                var results = await query.ToListAsync();

                return Result<List<PatientResultDto>>.Success(results);
            }
        }
    }
}