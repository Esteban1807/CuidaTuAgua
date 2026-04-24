using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.Methids
{
    public interface ICreateMethod<D> where D : BaseDto
    {
        Task<D> CreateAsync(D dto);
    }
}
