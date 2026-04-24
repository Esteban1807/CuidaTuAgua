using AutoMapper;
using Business.Interfaces.baseBusiness;
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

namespace Business.Implements.baseBusiness.abstractBusiness
{
    public abstract class ABaseBusiness<T,D, DResponseId, DEditId> : IBaseBusiness<T, D, DResponseId, DEditId> where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditId : BaseDtoId
    {
        protected readonly IBaseData<T> _data;
        protected readonly IMapper _mapper;
        protected readonly ILogger<ABaseBusiness<T, D, DResponseId, DEditId>> _logger;
        public ABaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<ABaseBusiness<T, D, DResponseId, DEditId>> logger)
        {
            _data = data;
            _mapper = mapper;
            _logger = logger;
        }

        public abstract Task<IEnumerable<DResponseId>> GetAllAsync();
        public abstract Task<DResponseId> GetByIdAsync(Guid id);
        public abstract Task<D> CreateAsync(D dto);
        public abstract Task<DEditId> UpdateAsync(DEditId dto);
        public abstract Task<bool> DeleteAsync(Guid id);
        public abstract Task<bool> SoftDeleteAsync(Guid id);
    }
}
