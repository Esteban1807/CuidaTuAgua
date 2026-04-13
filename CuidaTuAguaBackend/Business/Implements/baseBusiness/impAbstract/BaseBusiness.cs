using AutoMapper;
using Business.Implements.baseBusiness.abstractBusiness;
using Data.Interfaces.baseData;
using Entity.dto.baseDto;
using Entity.Model.baseModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.baseBusiness.impAbstract
{
    public class BaseBusiness<T, D> : ABaseBusiness<T, D> where T : BaseModel where D : BaseDto
    { 
        public BaseBusiness(IBaseData<T> data, IMapper mapper  ,ILogger<BaseBusiness<T, D>> logger ) : base(data, mapper, logger)
        {
        }

        public override async Task<IEnumerable<D>> GetAllAsync()
        {
            try
            {
                var entities = await _data.GetAllAsync();
                return _mapper.Map<List<D>>(entities.ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(GetAllAsync)}");
                throw;
            }
        }

        public override async Task<D> GetByIdAsync(Guid id)
        {
            try
            {
                var entity = await _data.GetByIdAsync(id);
                if (entity == null)
                    return null;
                return _mapper.Map<D>(entity);
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
                return _mapper.Map<D>(createdEntity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating entity");
                throw;
            }
        }

        public override async Task<D> UpdateAsync(D dto)
        {
            try
            {
                var entity = _mapper.Map<T>(dto);
                await _data.DeleteAsync(entity);
                // No hay método async, pero podemos hacer await Task.CompletedTask para mantener async signature
                await Task.CompletedTask;
                var updated = await _data.GetByIdAsync(entity.Id);
                return _mapper.Map<D>(updated);
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
                await _data.DeleteAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error en {nameof(DeleteAsync)} con Id={id}");
                throw;
            }
        }
    }
}
