using System;
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
        public async Task<IActionResult> GetTreatments()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTreatment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTreatment(Treatment treatment)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Treatment = treatment }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTreatment(Guid id, Treatment treatment)
        {
            treatment.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Treatment = treatment}));
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command{Id = id}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTreatment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}