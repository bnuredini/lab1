using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Core;

namespace Application.VaccineConfirmations
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var vaccineConfirmation = await _context.VaccineConfirmations.FindAsync(request.Id);

                _context.Remove(vaccineConfirmation);
                if (!(await _context.SaveChangesAsync() > 0))
                {
                    return Result<Unit>.Failure("Failed to delete the Vaccine Confirmation");
                }

               return (Result<Unit>.Success(Unit.Value));
            }
        }
    }
}