using Microsoft.AspNetCore.Mvc;
using ServerApp.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ServerApp.Controllers
{
    public abstract class BaseEntityController<T> : ControllerBase where T : class, IEntity
    {
        protected readonly IEntityService<T> _entityService;

        protected BaseEntityController(IEntityService<T> entityService)
        {
            _entityService = entityService;
        }

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
