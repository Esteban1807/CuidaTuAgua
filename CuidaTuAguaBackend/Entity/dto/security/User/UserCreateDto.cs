using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.User
{
    public class UserCreateDto : BaseDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public Guid IdPerson { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
