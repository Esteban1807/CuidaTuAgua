using Entity.baseModel;

namespace Entity.Security
{
    public class User : BaseModel
    {
        public int FullName { get; set; }
        public int Email { get; set; }
        public int Document { get; set; }
        public int Password { get; set; }
        public ICollection<Home> Homes { get; set; }
    }
}
