using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.UserRole
{
    public class UserRoleDto : BaseDtoId
    {
        public Guid IdUser { get; set; }
        public string NameUser { get; set; }
        public Guid IdRole { get; set; }
        public string NameRole { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeleteAt { get; set; }
        public bool Status { get; set; }
    }
}
