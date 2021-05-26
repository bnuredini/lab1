using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Countries;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{ 
    [AllowAnonymous]
    public class CountriesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Country>>> GetCountries()
        {
            return await Mediator.Send(new List.Query());
        }

        // [HttpGet{id}]
        // public async Task<ActionResult<List<Country>> GetCountry()
        // {

        // }
    }
}