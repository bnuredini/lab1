using System;
using System.Threading.Tasks;
using Application.Doctors;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     [AllowAnonymous]
    public class DoctorsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Doctor = doctor}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDoctor(Guid id, Doctor doctor)
        {
            doctor.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Doctor = doctor}));
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateResult(Guid id)
        {
            return HandleResult(await Mediator.Send(new PatientAdder.Command{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}