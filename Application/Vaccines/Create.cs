using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Vaccines
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Vaccine Vaccine { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(x => x.Vaccine).SetValidator(new VaccineValidator());
      }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _context = context;
        _userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _context.Users.FirstOrDefaultAsync(x =>
            x.UserName == _userAccessor.GetUsername());

        var patient = new PatientVaccine
        {
          AppUser = user,
          Vaccine = request.Vaccine
        };

        request.Vaccine.Patients.Add(patient);
        _context.Vaccines.Add(request.Vaccine);

        if (!(await _context.SaveChangesAsync() > 0))
        {
          return Result<Unit>.Failure("Failed during Vaccine creation");
        }

        return Result<Unit>.Success(Unit.Value);
      }
    }
  }
}