using Entity.dto.security.DataPerson;
using Entity.Model.baseModel;
using Entity.Model.security;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Interfaces.security
{
    public interface IDataPersonController : IBaseController<DataPerson, DataPersonCreateDto, DataPersonDto, DataPersonUpdateDto>
    {
    }
}
