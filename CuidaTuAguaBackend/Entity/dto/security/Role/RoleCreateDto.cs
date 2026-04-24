using Entity.dto.genericDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.Role
{
    public class RoleCreateDto : GenericDto
    {
        public DateTime CreatedAt { get; set; }
    }
}
