using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.RoleFormPermission
{
    public class RoleFormPermissionCreateDto : BaseDto
    {
        public Guid IdRole { get; set; }
        public Guid IdForm { get; set; }
        public Guid IdPermission { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
