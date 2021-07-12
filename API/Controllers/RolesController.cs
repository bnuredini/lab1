using System;
using System.Threading.Tasks;
using Application.Roles;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RolesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(Position role)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Role = role}));
        }
        // [Authorize(Policy = "IsAdmin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditRole(Guid id, Position role)
        {
            role.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Role = role}));
        }
        // [Authorize(Policy = "IsAdmin")]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(Guid id)
        {
            return HandleResult(await Mediator.Send(new UserAdder.Command{Id = id}));
        }
        // [Authorize(Policy = "IsAdmin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}