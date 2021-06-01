using System;
using System.Threading.Tasks;
using Application.PrivateCenters;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PrivateCenterController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPrivateCenters()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrivateCenter(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrivateCenter(Private_Center privateCenter)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Private_Center = privateCenter}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPrivateCenter(Guid id, Private_Center privateCenter)
        {
            privateCenter.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Private_Center = privateCenter}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrivateCenter(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}