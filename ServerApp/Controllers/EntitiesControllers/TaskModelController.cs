using ServerApp.Models;
using ServerApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Controller for managing TaskModel entities.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TaskModelController : BaseEntityController<TaskModel>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TaskModelController"/> class with the specified entity service.
        /// </summary>
        /// <param name="entityService">The entity service.</param>
        public TaskModelController(IEntityService<TaskModel> entityService)
            : base(entityService)
        {
        }
    }
}


