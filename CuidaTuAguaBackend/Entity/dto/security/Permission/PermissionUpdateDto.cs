using Entity.dto.genericDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.Permission
{
    public class PermissionUpdateDto : GenericDtoId
    {
        public DateTime UpdateAt { get; set; }
        public DateTime DeleteAt { get; set; }
        public bool Status { get; set; }
    }
}
