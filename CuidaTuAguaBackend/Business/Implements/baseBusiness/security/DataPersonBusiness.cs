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
    public class DataPersonBusiness : BaseBusiness<DataPerson, DataPersonDto>, IDataPersonBusiness
    {
        public DataPersonBusiness(IBaseData<DataPerson> data, IMapper mapper, ILogger<DataPersonBusiness> logger) : base(data, mapper, logger)
        {
        }

        public async Task<DataPersonDto> GetByIdentification(string numberIdent)
        {
            try
            {
                var entities = await _data.GetAllAsync();
                var dataPerson = entities.FirstOrDefault(dp => dp.IdentificationNumber == numberIdent);
                if (dataPerson == null)
                {
                    _logger.LogWarning($"No DataPerson found with identification number: {numberIdent}");
                    return null;
                }
                return _mapper.Map<DataPersonDto>(dataPerson);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while fetching DataPerson by email: {numberIdent}");
                throw;
            }
        }
    }
}
