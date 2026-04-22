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
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Module = Entity.Model.security.Module;

namespace Business.Implements.baseBusiness.security
{
    public class ModuleBusiness : BaseBusiness<Module, ModuleDto>, IModuleBusiness
    {
        public ModuleBusiness(IBaseData<Module> data, IMapper mapper, ILogger<ModuleBusiness> logger) : base(data, mapper, logger)
        {
        }
    }
}
