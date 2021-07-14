using System;
using System.Threading.Tasks;
using Application.TestConfirmations;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [AllowAnonymous]
    public class TestConfirmationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTestConfirmations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTestConfirmation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestConfirmation(TestConfirmation testConfirmation)
        {
            return HandleResult(await Mediator.Send(new Create.Command {TestConfirmation = testConfirmation}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTestConfirmation(Guid id, TestConfirmation testConfirmation)
        {
            testConfirmation.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{TestConfirmation = testConfirmation}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestConfirmation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}