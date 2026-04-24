using AutoMapper;
using Business.Implements.baseBusiness.impAbstract;
using Business.Interfaces.security;
using Data.Interfaces.baseData;
using Entity.dto.security.FormModule;
using Entity.Model.security;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.security
{
    public class FormModuleBusiness : BaseBusiness<FormModule, FormModuleCreateDto, FormModuleDto, FormModuleUpdateDto>, IFormModuleBusiness
    {
        public FormModuleBusiness(IBaseData<FormModule> data, IMapper mapper, ILogger<FormModuleBusiness> logger) : base(data, mapper, logger)
        {
        }
    }
}
