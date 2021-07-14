using System;
using System.Threading.Tasks;
using Application.VaccineConfirmations;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [AllowAnonymous]
    public class VaccineConfirmationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetVaccineConfirmations()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVaccineConfirmation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVaccineConfirmation(VaccineConfirmation vaccineConfirmation)
        {
            return HandleResult(await Mediator.Send(new Create.Command {VaccineConfirmation = vaccineConfirmation}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVaccineConfirmation(Guid id, VaccineConfirmation vaccineConfirmation)
        {
            vaccineConfirmation.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{VaccineConfirmation = vaccineConfirmation}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVaccineConfirmation(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}