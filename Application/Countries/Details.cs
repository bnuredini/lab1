using System.Collections.Generic;
using Domain;
using MediatR;

namespace Application.Countries
{
    public class Details
    {
        public class Query : IRequest<Country>
        {

        }
    }
}