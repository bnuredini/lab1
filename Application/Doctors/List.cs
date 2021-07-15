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

namespace Application.Doctors
{
    public class List
    {
        public class Query : IRequest<Result<List<DoctorDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DoctorDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<DoctorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var doctor = await _context.Doctors
                    .ProjectTo<DoctorDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<DoctorDto>>.Success(doctor);
            }
        }
    }
}