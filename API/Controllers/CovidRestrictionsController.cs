using System;
using System.Threading.Tasks;
using Application.CovidRestrictions;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [AllowAnonymous]
    public class CovidRestrictionsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCovidRestrictions()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCovidRestriction(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCovidRestriction(CovidRestriction covidRestriction)
        {
            return HandleResult(await Mediator.Send(new Create.Command {CovidRestriction = covidRestriction}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCovidRestriction(Guid id, CovidRestriction covidRestriction)
        {
            covidRestriction.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{CovidRestriction = covidRestriction}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCovidRestriction(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}