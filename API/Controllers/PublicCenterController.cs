using System;
using System.Threading.Tasks;
using Application.PublicCenters;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PublicCenterController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPublicCenters()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPublicCenter(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePublicCenter(Public_Center publicCenter)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Public_Center = publicCenter}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPublicCenter(Guid id, Public_Center publicCenter)
        {
            publicCenter.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Public_Center = publicCenter}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicCenter(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}