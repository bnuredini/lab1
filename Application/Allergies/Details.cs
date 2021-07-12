using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergies
{
    public class Details
    {
        public class Query : IRequest<Result<AllergyDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AllergyDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<AllergyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var allergy = await _context.Allergies
                .ProjectTo<AllergyDto>(_mapper.ConfigurationProvider,
                new { currentUsername = _userAccessor.GetUsername() })
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<AllergyDto>.Success(allergy);
            }
        }
    }
}