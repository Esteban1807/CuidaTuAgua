using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.UserRole
{
    public class UserRoleUpdateDto : BaseDtoId
    {
        public Guid IdUser { get; set; }
        public Guid IdRole { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime DeleteAt { get; set; }
        public bool Status { get; set; }
    }
}
