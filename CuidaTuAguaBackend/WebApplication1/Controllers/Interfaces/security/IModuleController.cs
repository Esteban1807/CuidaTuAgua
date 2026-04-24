using Entity.dto.security.Module;
using Entity.Model.security;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Interfaces.security
{
    public interface IModuleController : IBaseController<Module, ModuleCreateDto, ModuleDto, ModuleUpdateDto>
    {
    }
}
