using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.baseModel
{
    public class BaseModel
    {
        //id, status, createdAt, updatedAt, deletedAt
        public int Id { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
//Generic : name, description, url