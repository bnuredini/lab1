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

namespace Application.Vaccines
{
    public class Details
    {
        public class Query : IRequest<Result<VaccineDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<VaccineDto>>
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

            public async Task<Result<VaccineDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var vaccine = await _context.Vaccines
                    .ProjectTo<VaccineDto>(_mapper.ConfigurationProvider, 
                        new {currentUseranme = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<VaccineDto>.Success(vaccine);
            }
        }
    }
}