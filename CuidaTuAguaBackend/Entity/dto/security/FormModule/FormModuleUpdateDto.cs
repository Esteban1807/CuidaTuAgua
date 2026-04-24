using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.FormModule
{
    public class FormModuleUpdateDto : BaseDtoId
    {
        public Guid IdForm { get; set; }
        public Guid IdModule { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime DeleteAt { get; set; }
        public bool Status { get; set; }
    }
}
