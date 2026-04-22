using Entity.dto.baseDto;
using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.baseBusiness
{
    public interface IBaseBusiness<T, D> where T : BaseModel where D : BaseDto
    {
        Task<IEnumerable<D>> GetAllAsync();
        Task<D> GetByIdAsync(Guid id);
        Task<D> CreateAsync(D dto);
        Task<D> UpdateAsync(D dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
