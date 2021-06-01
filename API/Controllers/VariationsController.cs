using System;
using System.Threading.Tasks;
using Application.Variations;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class VariationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetVariations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVariation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVariation(Variation variation)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Variation = variation}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVariation(Guid id, Variation variation)
        {
            variation.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Variation = variation}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVariation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}