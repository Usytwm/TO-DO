using Microsoft.AspNetCore.Mvc;
using ServerApp.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Base controller for handling common CRUD operations on entities.
    /// </summary>
    /// <typeparam name="T">The type of entity.</typeparam>
    public abstract class BaseEntityController<T> : ControllerBase where T : class, IEntity
    {
        protected readonly IEntityService<T> _entityService;

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseEntityController{T}"/> class with the specified entity service.
        /// </summary>
        /// <param name="entityService">The entity service.</param>
        protected BaseEntityController(IEntityService<T> entityService)
        {
            _entityService = entityService ?? throw new ArgumentNullException(nameof(entityService));
        }

        /// <summary>
        /// Retrieves all entities.
        /// </summary>
        /// <returns>A collection of entities.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetAll()
        {
            try
            {
                var entities = await _entityService.GetAllAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        /// <summary>
        /// Retrieves an entity by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the entity to retrieve.</param>
        /// <returns>The retrieved entity.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetById(Guid id)
        {
            try
            {
                var entity = await _entityService.GetByIdAsync(id);
                if (entity == null)
                {
                    return NotFound();
                }

                return Ok(entity);
            }
            catch (Exception ex)
            {
                // Log the exception details
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="entity">The entity to create.</param>
        /// <returns>The created entity.</returns>
        [HttpPost]
        public async Task<ActionResult<T>> Create(T entity)
        {
            try
            {
                var createdEntity = await _entityService.CreateAsync(entity);
                return CreatedAtAction(nameof(GetById), new { id = entity.Id }, createdEntity);
            }
            catch (Exception ex)
            {
                // Log the exception details
                return BadRequest("Error creating entity: " + ex.Message);
            }
        }

        /// <summary>
        /// Updates an entity by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the entity to update.</param>
        /// <param name="entity">The updated entity.</param>
        /// <returns>An IActionResult representing the result of the operation.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, T entity)
        {
            try
            {
                await _entityService.UpdateAsync(id, entity);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception details
                if (ex.Message == "Entity not found")
                {
                    return NotFound();
                }
                return BadRequest("Error updating entity: " + ex.Message);
            }
        }

        /// <summary>
        /// Deletes an entity by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the entity to delete.</param>
        /// <returns>An IActionResult representing the result of the operation.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _entityService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Log the exception details
                if (ex.Message == "Entity not found")
                {
                    return NotFound();
                }
                return BadRequest("Error deleting entity: " + ex.Message);
            }
        }
    }
}
