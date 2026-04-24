using AutoMapper;
using Business.Implements.baseBusiness.impAbstract;
using Business.Interfaces.security;
using Data.Interfaces.baseData;
using Entity.dto.security.Person;
using Entity.Model.security;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Implements.security
{
    public class PersonBusiness : BaseBusiness<Person, PersonCreateDto, PersonDto, PersonUpdateDto>, IPersonBusiness
    {
        public PersonBusiness(IBaseData<Person> data, IMapper mapper, ILogger<PersonBusiness> logger) : base(data, mapper, logger)
        {
        }
    }
}
