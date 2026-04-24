using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.RoleFormPermission
{
    public class RoleFormPermissionDto : BaseDtoId
    {
        public Guid IdRole { get; set; }
        public string RoleName { get; set; }
        public Guid IdForm { get; set; }
        public string FormName { get; set; }
        public Guid IdPermission { get; set; }
        public string PermissionName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
        public bool Status { get; set; }
    }
}
