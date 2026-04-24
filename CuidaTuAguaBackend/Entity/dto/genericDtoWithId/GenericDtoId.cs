using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.genericDtoWithId
{
    public class GenericDtoId : BaseDtoId
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
    }
}
