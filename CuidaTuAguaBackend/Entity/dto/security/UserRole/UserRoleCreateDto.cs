using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.UserRole
{
    public class UserRoleCreateDto : BaseDto
    {
        public Guid IdUser { get; set; }
        public Guid IdRole { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
