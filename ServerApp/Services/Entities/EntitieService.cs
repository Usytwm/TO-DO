using ServerApp.Models;

namespace ServerApp.Services
{
    public class EntityService : BaseEntityService<TaskModel>
    {
        public EntityService(MyDbContext context) : base(context)
        {
        }
    }
}