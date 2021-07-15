using System;
using System.Threading.Tasks;
using Application.Drugs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class DrugsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDrugs()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrug(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDrug(Drug drug)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Drug = drug}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDrug(Guid id, Drug drug)
        {
            drug.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Drug = drug}));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateDrug(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrug(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}