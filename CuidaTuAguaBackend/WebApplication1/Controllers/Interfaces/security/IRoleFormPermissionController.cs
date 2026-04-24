using Entity.dto.security.RoleFormPermission;
using Entity.Model.security;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Interfaces.security
{
    public interface IRoleFormPermissionController : IBaseController<RoleFormPermission, RoleFormPermissionCreateDto, RoleFormPermissionDto, RoleFormPermissionUpdateDto>
    {
    }
}
