using AutoMapper;
using Business.Implements.baseBusiness.impAbstract;
using Business.Interfaces.security;
using Data.Interfaces.baseData;
using Entity.dto.security;
using Entity.Model.security;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.baseBusiness.security
{
    public class UserBusiness : BaseBusiness<User, UserDto>, IUserBusiness
    {
        public UserBusiness(IBaseData<User> data, IMapper mapper, ILogger<UserBusiness> logger) : base(data, mapper, logger)
        {
        }
    }
}
