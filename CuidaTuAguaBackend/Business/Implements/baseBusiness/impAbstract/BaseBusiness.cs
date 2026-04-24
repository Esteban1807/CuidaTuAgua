using AutoMapper;
using Business.Implements.baseBusiness.abstractBusiness;
using Data.Interfaces.baseData;
using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using Entity.Model.baseModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.baseBusiness.impAbstract
{
    public class BaseBusiness<T, D, DResponseId, DEditID> : ABaseBusiness<T, D, DResponseId, DEditID> where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditID : BaseDtoId
    {
        public BaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<BaseBusiness<T, D, DResponseId, DEditID>> logger) : base(data, mapper, logger)
        {
        }

        public override async Task<IEnumerable<DResponseId>> GetAllAsync()
        {
            try
            {
                var entities = await _data.GetAllAsync();
                return _mapper.Map<List<DResponseId>>(entities.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(GetAllAsync)}");
                throw;
            }
        }

        public override async Task<DResponseId> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _data.GetByIdAsync(id);
                if (entity == null)
                    return null;
                return _mapper.Map<DResponseId>(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(GetByIdAsync)} con Id={id}");
                throw;
            }
        }

        public override async Task<D> CreateAsync(D dto)
        {
            try
            {
                var entity = _mapper.Map<T>(dto);
                var createdEntity = await _data.CreateAsync(entity);

                if (createdEntity == null)
                    {
                    _logger.LogError("Error creating entity: "+ entity +" is null");
                    throw new Exception("Error creating entity");
                }
                
                createdEntity.CreatedAt = DateTime.UtcNow;
                return _mapper.Map<D>(createdEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating entity");
                throw;
            }
        }

        public override async Task<DEditID> UpdateAsync(DEditID dto)
        {
            try
            {
                var entity = _mapper.Map<T>(dto);
                await _data.DeleteAsync(entity);
                // No hay método async, pero podemos hacer await Task.CompletedTask para mantener async signature
                await Task.CompletedTask;
                var updated = await _data.GetByIdAsync(entity.Id);
                return _mapper.Map<DEditID>(updated);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}");
                throw;
            }
        }


        public override async Task<bool> DeleteAsync(Guid id)
        {
            try
            {
                var entity = await _data.GetByIdAsync(id);
                if (entity == null)
                    return false;

                entity.Status = false;
                entity.DeletedAt = DateTime.UtcNow;
                await _data.DeleteAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(DeleteAsync)} con Id={id}");
                throw;
            }
        }


        /// <summary>
        /// Logical Delete: Change value of status to false, but the record is not deleted from the database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public override async Task<bool> SoftDeleteAsync(Guid id)
        {
            try
            {
                var entity = await _data.GetByIdAsync(id);

                if (entity == null)
                {
                    _logger.LogError("Error deleting entity: " + entity + " is null");
                    throw new Exception("Error deleting entity");
                }
                
                entity.Status = false;
                entity.DeletedAt = DateTime.UtcNow;
                await _data.SoftDeleteAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(SoftDeleteAsync)} con Id={id}");
                throw;
            }
        }
    }
}