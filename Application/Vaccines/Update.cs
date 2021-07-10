using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Vaccines
{
  public class Update
  {
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    // public class Handler : IRequestHandler<Command, Result<Unit>>
    // {
    //     private readonly DataContext _context;
    //     private readonly IUserAccessor _userAccessor;

    //     public Handler(DataContext context, IUserAccessor userAccessor)
    //     {
    //         _userAccessor = userAccessor;
    //         _context = context;
    //     }

    //     // public Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
    //     // {

    //     // }
    // }
  }
}