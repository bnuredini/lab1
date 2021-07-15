using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Treatments
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

                var treatment = await _context.Treatments.FirstOrDefaultAsync(x =>
                    x.Id == request.Id);
                if (treatment == null) return null;

                var patient = new PatientTreatment
                {
                    AppUser = user,
                    Treatment = treatment
                };
                
                treatment.Patients.Add(patient);

                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed during Treatment updation");
                }
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}