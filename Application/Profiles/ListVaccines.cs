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
    public class ListVaccines
    {
        public class Query : IRequest<Result<List<PatientVaccineDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientVaccineDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientVaccineDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientVaccines
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Vaccine.Efficacy)
                    .ProjectTo<PatientVaccineDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                // query = request.Predicate switch
                // {
                //     "past" => query.Where(a => a.Date <= DateTime.Now),
                //     "hosting" => query.Where(a => a.HostUsername == request.Username),
                //     _ => query.Where(a => a.Date >= DateTime.Now)
                // };

                var vaccines = await query.ToListAsync();

                return Result<List<PatientVaccineDto>>.Success(vaccines);
            }
        }
    }
}