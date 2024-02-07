using System;
using System.Collections.Generic;
using System.Threading.Tasks;

/// <summary>
/// Interface for defining common CRUD operations on entities.
/// </summary>
/// <typeparam name="T">The type of entity.</typeparam>
public interface IEntityService<T>
{
    /// <summary>
    /// Asynchronously retrieves all entities.
    /// </summary>
    /// <returns>A collection of entities.</returns>
    Task<IEnumerable<T>> GetAllAsync();

    /// <summary>
    /// Asynchronously retrieves an entity by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to retrieve.</param>
    /// <returns>The retrieved entity.</returns>
    Task<T> GetByIdAsync(Guid id);

    /// <summary>
    /// Asynchronously creates a new entity.
    /// </summary>
    /// <param name="entity">The entity to create.</param>
    /// <returns>The created entity.</returns>
    Task<T> CreateAsync(T entity);

    /// <summary>
    /// Asynchronously updates an entity.
    /// </summary>
    /// <param name="id">The identifier of the entity to update.</param>
    /// <param name="entity">The updated entity.</param>
    /// <returns>The updated entity.</returns>
    Task<T> UpdateAsync(Guid id, T entity);

    /// <summary>
    /// Asynchronously deletes an entity by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the entity to delete.</param>
    /// <returns>The deleted entity.</returns>
    Task<T> DeleteAsync(Guid id);
}
