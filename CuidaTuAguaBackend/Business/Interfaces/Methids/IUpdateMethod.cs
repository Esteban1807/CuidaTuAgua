using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.Methids
{
    public interface IUpdateMethod<DId> where DId : BaseDtoId
    {
        Task<DId> UpdateAsync(DId dto);
    }
}
