using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Drugs;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class DrugsController : BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Drug>>> GetDrugs()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Drug>> GetDrug(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateDrug(Drug drug)
        {
            return Ok(await Mediator.Send(new Create.Command {Drug = drug}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDrug(Guid id, Drug drug)
        {
            drug.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Drug=drug}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrug(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id =id}));
        }
    }
}