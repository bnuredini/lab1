using System;
using System.Threading.Tasks;
using Application.Allergies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AllergiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllergies()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllergy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAllergy(Allergy allergy)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Allergy = allergy }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAllergy(Guid id, Allergy allergy)
        {
            allergy.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Allergy = allergy }));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAllergy(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command { Id = id }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAllergy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}