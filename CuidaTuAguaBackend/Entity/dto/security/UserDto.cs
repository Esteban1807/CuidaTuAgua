using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security
{
    public class UserDto : BaseDto
    {
        public Guid IdPerson { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
