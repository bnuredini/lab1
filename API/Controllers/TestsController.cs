using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Tests;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TestsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Test>>> GetTests()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Test>> GetTest(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateTest(Test test)
        {
            return Ok(await Mediator.Send(new Create.Command {Test = test}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTest(Guid id, Test test)
        {
            test.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Test = test}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}