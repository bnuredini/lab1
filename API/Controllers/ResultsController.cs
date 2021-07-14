using System;
using System.Threading.Tasks;
using Application.Rezults;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ResultsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetResults()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateResult(Rezult rezult)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Rezult = rezult}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditResult(Guid id, Rezult rezult)
        {
            rezult.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Rezult = rezult}));
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}