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
    public class ListAllergies
    {
        public class Query : IRequest<Result<List<PatientAllergyDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientAllergyDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientAllergyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientAllergy
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Allergy.Type)
                    .ProjectTo<PatientAllergyDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var allergies = await query.ToListAsync();

                return Result<List<PatientAllergyDto>>.Success(allergies);
            }
        }
    }
}