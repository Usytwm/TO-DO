using ServerApp.Models;

namespace ServerApp.Services
{
    /// <summary>
    /// Service for managing TaskModel entities.
    /// </summary>
    public class EntityService : BaseEntityService<TaskModel>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EntityService"/> class with the specified database context.
        /// </summary>
        /// <param name="context">The database context.</param>
        public EntityService(MyDbContext context) : base(context)
        {
        }
    }
}
