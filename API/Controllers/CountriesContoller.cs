using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Countries;
using Domain;
using Persistence;

namespace API.Controllers
{ 
    public class CountriesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}