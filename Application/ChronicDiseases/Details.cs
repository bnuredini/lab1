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

namespace Application.ChronicDiseases
{
    public class Details
    {
        public class Query : IRequest<Result<ChronicDiseaseDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ChronicDiseaseDto>>
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

            public async Task<Result<ChronicDiseaseDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var chronic_Disease = await _context.Chronic_Diseases
                .ProjectTo<ChronicDiseaseDto>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ChronicDiseaseDto>.Success(chronic_Disease);
            }
        }
    }
}