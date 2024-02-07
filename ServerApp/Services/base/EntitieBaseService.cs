namespace ServerApp.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    /// <summary>
    /// Base class for entity services providing common CRUD operations.
    /// </summary>
    /// <typeparam name="T">The type of entity.</typeparam>
    public abstract class BaseEntityService<T> : IEntityService<T> where T : class, IEntity
    {
        private readonly MyDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseEntityService{T}"/> class with the specified database context.
        /// </summary>
        /// <param name="context">The database context.</param>
        public BaseEntityService(MyDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        /// <summary>
        /// Asynchronously creates a new entity.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>The created entity.</returns>
        public async Task<T> CreateAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Asynchronously deletes an entity by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the entity to delete.</param>
        /// <returns>The deleted entity.</returns>
        public async Task<T> DeleteAsync(Guid id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Entity not found");
            }

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Asynchronously retrieves all entities.
        /// </summary>
        /// <returns>A collection of entities.</returns>
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        /// <summary>
        /// Asynchronously retrieves an entity by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the entity to retrieve.</param>
        /// <returns>The retrieved entity.</returns>
        public async Task<T> GetByIdAsync(Guid id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Entity not found");
            }
            return entity;
        }

        /// <summary>
        /// Asynchronously updates an entity.
        /// </summary>
        /// <param name="id">The identifier of the entity to update.</param>
        /// <param name="updatedEntity">The updated entity.</param>
        /// <returns>The updated entity.</returns>
        public async Task<T> UpdateAsync(Guid id, T updatedEntity)
        {
            if (updatedEntity == null)
            {
                throw new ArgumentNullException(nameof(updatedEntity));
            }

            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                throw new Exception("Entity not found");
            }
            updatedEntity.Id = id;
            _context.Entry(entity).CurrentValues.SetValues(updatedEntity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
