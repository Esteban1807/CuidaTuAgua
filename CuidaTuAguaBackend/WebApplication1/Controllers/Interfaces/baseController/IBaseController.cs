using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using Entity.Model.baseModel;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers.Interfaces.baseController
{
    public interface IBaseController<T, D, DResponseId, DEditId> where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditId : BaseDtoId
    {
            Task<IActionResult> GetAllAsync();
            Task<IActionResult> GetByIdAsync(Guid id);
            Task<IActionResult> CreateAsync(D dto);
            Task<IActionResult> UpdateAsync(/*Guid id,*/ DEditId dto);
            Task<IActionResult> DeleteAsync(Guid id);
            Task<IActionResult> SoftDeleteAsync(Guid id);
    }
}
