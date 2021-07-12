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

namespace Application.Roles
{
    public class List
    {
        public class Query : IRequest<Result<List<RoleDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RoleDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<RoleDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var roles = await _context.Positions
                    .ProjectTo<RoleDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<RoleDto>>.Success(roles);
            }
        }
    }
}