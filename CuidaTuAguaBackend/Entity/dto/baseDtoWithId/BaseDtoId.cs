using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.baseDtoWithId
{
    public class BaseDtoId : BaseDto
    {
        public Guid Id { get; set; }
    }
}
