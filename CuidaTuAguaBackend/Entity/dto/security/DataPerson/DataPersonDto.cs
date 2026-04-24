using Entity.dto.baseDtoWithId;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.dto.security.DataPerson
{
    public class DataPersonDto : BaseDtoId
    {
        public string PhoneNumber { get; set; }
        public string IdentificationNumber { get; set; }
        public DateOnly YearBirth { get; set; }
        public Guid IdPerson { get; set; }
        public bool Status { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime DeleteAt { get; set; }
    }
}
