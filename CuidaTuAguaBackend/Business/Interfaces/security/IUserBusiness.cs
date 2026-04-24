using Business.Interfaces.baseBusiness;
using Entity.dto.security.User;
using Entity.dto.security.UserRole;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.security
{
    public interface IUserBusiness : IBaseBusiness<User,UserCreateDto, UserDto, UserUpdateDto>
    {
    }
}
