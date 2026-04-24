using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.RoleFormPermission
{
    public class RoleFormPermissionUpdateDto : BaseDtoId
    {
        public Guid IdRole { get; set; }
        public Guid IdForm { get; set; }
        public Guid IdPermission { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime DeleteAt { get; set; }
        public bool Status { get; set; }
    }
}
