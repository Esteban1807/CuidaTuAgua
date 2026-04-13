using Entity.dto.baseDto;
using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.genericDto
{
    public class GenericDto : BaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
    }
}
