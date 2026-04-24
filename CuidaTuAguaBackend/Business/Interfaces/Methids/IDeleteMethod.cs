using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces.Methids
{
    public interface IDeleteMethod
    {
        Task<bool> DeleteAsync(Guid id);
    }
}
