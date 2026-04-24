using Business.Interfaces.Methids;
using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.baseBusiness
{
    public interface IBaseBusiness<T , D, DResponseId, DEditId> : IGetAllMethod<DResponseId>, IGetByIdMethod<DResponseId>, ICreateMethod<D>, IUpdateMethod<DEditId>, IDeleteMethod where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditId : BaseDtoId
    {
        Task<bool> SoftDeleteAsync(Guid id);
    }
}
