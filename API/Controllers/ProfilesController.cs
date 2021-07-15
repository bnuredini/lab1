using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpGet("{username}/allergies")]
        public async Task<IActionResult> GetPatientAllergies(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListAllergies.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/vaccines")]
        public async Task<IActionResult> GetPatientVaccines(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListVaccines.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/chronicDiseases")]
        public async Task<IActionResult> GetPatientChronicDiseases(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListChronicDiseases.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/results")]
        public async Task<IActionResult> GetPatientResults(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListResults.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/doctors")]
        public async Task<IActionResult> GetPatientDoctors(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListDoctors.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/drugs")]
        public async Task<IActionResult> GetPatientDrugs(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListDrugs.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/treatment")]
        public async Task<IActionResult> GetPatientTreatments(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListTreatments.Query
            { Username = username, Predicate = predicate }));
        }
        [HttpGet("{username}/vaccineapplications")]
        public async Task<IActionResult> GetPatientApplications(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListApplications.Query
            { Username = username, Predicate = predicate }));
        }
    }
}