using System;
using System.Threading.Tasks;
using Application.VaccineApplications;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class VaccineApplicationsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetVaccineApplications()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
       

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVaccineApplication(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVaccineApplication(VaccineApplication vaccineApplication)
        {
            return HandleResult(await Mediator.Send(new Create.Command {VaccineApplication = vaccineApplication}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVaccineApplication(Guid id, VaccineApplication vaccineApplication)
        {
            vaccineApplication.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{VaccineApplication = vaccineApplication}));
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVaccineApplication(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}