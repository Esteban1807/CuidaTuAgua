using AutoMapper;
using Business.Implements.baseBusiness.impAbstract;
using Business.Interfaces.security;
using Data.Interfaces.baseData;
using Entity.dto.security.UserRole;
using Entity.Model.security;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.security
{
    public class UserRoleBusiness : BaseBusiness<UserRole, UserRoleCreateDto, UserRoleDto, UserRoleUpdateDto>, IUserRoleBusiness
    {
        public UserRoleBusiness(IBaseData<UserRole> data, IMapper mapper, ILogger<UserRoleBusiness> logger) : base(data, mapper, logger)
        {
        }
    }
}
