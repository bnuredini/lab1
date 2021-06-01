using System;
using System.Threading.Tasks;
using Application.Rezults;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class RezultController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRezults()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRezult(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRezult(Rezult rezult)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Rezult = rezult}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRezult(Guid id, Rezult rezult)
        {
            rezult.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Rezult = rezult}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRezult(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}