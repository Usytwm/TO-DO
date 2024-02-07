using ServerApp.Models;
using ServerApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskModelController : BaseEntityController<TaskModel>
    {
        public TaskModelController(IEntityService<TaskModel> entityService)
            : base(entityService)
        {
        }

        // Aquí puedes agregar métodos adicionales específicos para TaskModel
    }
}

