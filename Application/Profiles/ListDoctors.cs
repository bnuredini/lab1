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
    public class ListDoctors
    {
        public class Query : IRequest<Result<List<PatientDoctorDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PatientDoctorDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<PatientDoctorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PatientDoctors
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Doctor.Type)
                    .ProjectTo<PatientDoctorDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var doctors = await query.ToListAsync();

                return Result<List<PatientDoctorDto>>.Success(doctors);
            }
        }
    }
}