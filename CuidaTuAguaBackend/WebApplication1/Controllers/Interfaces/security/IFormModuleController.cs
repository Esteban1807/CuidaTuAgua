using Entity.dto.security.FormModule;
using Entity.Model.security;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Interfaces.security
{
    public interface IFormModuleController : IBaseController<FormModule, FormModuleCreateDto, FormModuleDto, FormModuleUpdateDto>
    {
    }
}
