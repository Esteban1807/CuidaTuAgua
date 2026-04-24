using AutoMapper;
using Business.Implements.baseBusiness.impAbstract;
using Business.Interfaces.security;
using Data.Interfaces.baseData;
using Entity.dto.security.Form;
using Entity.Model.security;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.security
{
    public class FormBusiness : BaseBusiness<Form, FormCreateDto, FormDto, FormUpdateDto>, IFormBusiness
    {
        public FormBusiness(IBaseData<Form> data, IMapper mapper, ILogger<FormBusiness> logger) : base(data, mapper, logger) { }
    }
}
