using Business.Interfaces.baseBusiness;
using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using Entity.Model.baseModel;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Implements.aBaseController
{
    public abstract class ABaseController<T, D, DResponseId, DEditId> : ControllerBase where T : BaseModel where D : BaseDto where DResponseId : BaseDtoId where DEditId : BaseDtoId
    {
        protected IBaseBusiness<T, D, DResponseId, DEditId> _business;
        protected ILogger<ABaseController<T, D, DResponseId, DEditId>> _logger;

        public ABaseController(IBaseBusiness<T, D, DResponseId, DEditId> business, ILogger<ABaseController<T , D, DResponseId, DEditId>> logger)
        {
            _business = business;
            _logger = logger;
        }
         public abstract Task<IActionResult> GetAllAsync();
         public abstract Task<IActionResult> GetByIdAsync(Guid id);
         public abstract Task<IActionResult> CreateAsync(D dto);
         public abstract Task<IActionResult> UpdateAsync(/*Guid id,*/ DEditId dto);
         public abstract Task<IActionResult> DeleteAsync(Guid id);
         public abstract Task<IActionResult> SoftDeleteAsync(Guid id);
    }
}
