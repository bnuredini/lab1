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
    public class ListChronicDiseases
    {
        public class Query : IRequest<Result<List<PatientChronicDiseaseDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientChronicDiseaseDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientChronicDiseaseDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientChronicDisease
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.ChronicDisease.Name)
                    .ProjectTo<PatientChronicDiseaseDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                // query = request.Predicate switch
                // {
                //     "past" => query.Where(a => a.Date <= DateTime.Now),
                //     "hosting" => query.Where(a => a.HostUsername == request.Username),
                //     _ => query.Where(a => a.Date >= DateTime.Now)
                // };

                var chronicDiseases = await query.ToListAsync();

                return Result<List<PatientChronicDiseaseDto>>.Success(chronicDiseases);
            }
        }
    }
}