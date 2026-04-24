using Entity.dto.genericDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.Module
{
    public class ModuleCreateDto : GenericDto
    {
        public DateTime CreateAt { get; set; }
    }
}
