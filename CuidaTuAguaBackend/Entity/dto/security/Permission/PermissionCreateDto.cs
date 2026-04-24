using Entity.dto.genericDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.Permission
{
    public class PermissionCreateDto : GenericDto
    {
        public DateTime CreatedAt { get; set; }
    }
}
