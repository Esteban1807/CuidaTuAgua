using Business.Interfaces.baseBusiness;
using Entity.dto.baseDto;
using Entity.dto.security.DataPerson;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.security
{
    public interface IDataPersonBusiness : IBaseBusiness<DataPerson, DataPersonCreateDto, DataPersonDto, DataPersonUpdateDto>
    {
        public Task<DataPersonDto> GetByIdentification(string numberIdent);
    }
}
