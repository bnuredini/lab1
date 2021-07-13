using System;
using System.Threading.Tasks;
using Application.Locations;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [AllowAnonymous]
    public class LocationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocation(Location location)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Location = location}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLocation(Guid id, Location location)
        {
            location.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Location = location}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}