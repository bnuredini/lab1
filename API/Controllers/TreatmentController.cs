using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Treatments;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TreatmentController : BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Treatment>>> GetTreatments()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Treatment>> GetTreatment(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateTreatment(Treatment treatment)
        {
            return Ok(await Mediator.Send(new Create.Command {Treatment = treatment}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTreatment(Guid id, Treatment treatment)
        {
            treatment.Id=id;
            return Ok(await Mediator.Send(new Edit.Command{Treatment=treatment}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTreatment(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id =id}));
        }
    }
}