using Entity.dto.baseDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.DataPerson
{
    public class DataPersonCreateDto : BaseDto
    {
        public string PhoneNumber { get; set; }
        public DateOnly YearBirth { get; set; }
        public string IdentificationNumber { get; set; }
        public Guid IdPerson { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
