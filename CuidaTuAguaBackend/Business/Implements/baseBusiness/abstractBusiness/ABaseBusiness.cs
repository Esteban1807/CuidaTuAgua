using AutoMapper;
using Business.Interfaces.baseBusiness;
using Data.Interfaces.baseData;
using Entity.dto.baseDto;
using Entity.Model.baseModel;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.baseBusiness.abstractBusiness
{
    public abstract class ABaseBusiness<T, D> : IBaseBusiness<T, D> where T : BaseModel where D : BaseDto
    {
        protected readonly IBaseData<T> _data;
        protected readonly IMapper _mapper;
        protected readonly ILogger<ABaseBusiness<T, D>> _logger;
        public ABaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<ABaseBusiness<T, D>> logger)
        {
            _data = data;
            _mapper = mapper;
            _logger = logger;
        }

        public abstract Task<IEnumerable<D>> GetAllAsync();
        public abstract Task<D> GetByIdAsync(Guid id);
        public abstract Task<D> CreateAsync(D dto);
        public abstract Task<D> UpdateAsync(D dto);
        public abstract Task<bool> DeleteAsync(Guid id);
    }
}
