using Business.Interfaces.baseBusiness;
using Entity.dto.baseDto;
using Entity.dto.security.UserRole;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.security
{
    public interface IUserRoleBusiness : IBaseBusiness<UserRole, UserRoleCreateDto, UserRoleDto, UserRoleUpdateDto>
    {
    }
}
