using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Allergies
{
    public class PatientAdder
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername());

                var allergy = await _context.Allergies.FirstOrDefaultAsync(x =>
                    x.Id == request.Id);
                if (allergy == null) return null;

                var patient = new PatientAllergy
                {
                    AppUser = user,
                    Allergy = allergy
                };
                
                allergy.Patients.Add(patient);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during allergy updation");
                }
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}