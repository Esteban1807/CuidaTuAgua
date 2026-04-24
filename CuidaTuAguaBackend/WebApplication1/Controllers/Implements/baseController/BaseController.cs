using AutoMapper;
using Business.Interfaces.baseBusiness;
using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using Entity.Model.baseModel;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Implements.aBaseController;

namespace Web.Controllers.Implements.baseController
{
    [ApiController]
    public class BaseController<T, D, DResponseId, DEditId> : ABaseController<T, D, DResponseId, DEditId> where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditId : BaseDtoId
    {
        protected IMapper _mapper;
        protected BaseController(IBaseBusiness<T, D, DResponseId, DEditId> business, ILogger<ABaseController<T, D, DResponseId, DEditId>> logger, IMapper mapper) : base(business, logger)
        {
            _mapper = mapper;
        }

        [HttpGet]
        public override async Task<IActionResult> GetAllAsync()
        {
            try
            {
                var result = await _business.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllAsync");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public override async Task<IActionResult> GetByIdAsync(Guid id)
        {
            try
            {
                var result = await _business.GetByIdAsync(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetByIdAsync");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async override Task<IActionResult> CreateAsync([FromBody] D dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createEntity = await _business.CreateAsync(dto);
                DResponseId resultEntity = _mapper.Map<DResponseId>(createEntity);

                return CreatedAtAction(nameof(GetByIdAsync), new { id = resultEntity.Id }, resultEntity);
            }

            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error de validación al crear el registro");
                return BadRequest(ex.Message);
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear el registro.");
                return StatusCode(500, "Error interno del servidor");
            }

        }

        [HttpPut]
        public override async Task<IActionResult> UpdateAsync([FromBody] DEditId dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updatedEntity = await _business.UpdateAsync(dto);
                if (updatedEntity == null)
                {
                    return NotFound();
                }
                DResponseId resultEntity = _mapper.Map<DResponseId>(updatedEntity);
                return Ok(resultEntity);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, "Error de validación al actualizar el registro");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar el registro.");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        [HttpDelete("{id}")]
        public override async Task<IActionResult> DeleteAsync(Guid id)
        {
            try { 
            var result = await _business.DeleteAsync(id);
            if (!result)
                return NotFound($"Registro con ID {id} no encontrado.");

            return Ok(new {Succes = true});

            }

            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar el registro con ID {id}");
                return StatusCode(500, "Error interno del servidor");
            }
        }


        [HttpDelete("{id}")]
        public override async Task<IActionResult> SoftDeleteAsync(Guid id)
        {
            try
            {
                var result = await _business.SoftDeleteAsync(id);
                if (!result)
                    return NotFound($"Registro con ID {id} no encontrado.");

                return Ok(new { Succes = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar el eregistro con ID {id}");
                return StatusCode(500, "Error interno del servidor");

            }
        }
    }
}
