using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security
{
    public class FormModuleDto : BaseDto
    {
        public Guid IdForm { get; set; }
        public Guid IdModule { get; set; }
    }
}
