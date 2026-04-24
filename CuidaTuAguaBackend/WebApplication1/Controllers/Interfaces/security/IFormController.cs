using Entity.dto.security.Form;
using Entity.Model.security;
using Web.Controllers.Interfaces.baseController;

namespace Web.Controllers.Interfaces.security
{
    public interface IFormController : IBaseController<Form, FormCreateDto, FormDto, FormUpdateDto>
    {
    }
}
