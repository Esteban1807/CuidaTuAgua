builder.Services.AddAutoMapper(typeof(UserProfile).Assembly)
                                       ↓
AutoMapper escanea el Assembly y busca clases que heredan de Profile
                                       ↓
Encuentra: UserProfile (que está en Data/Mappers/security/)
                                       ↓
Lee todos los CreateMap<> definidos en UserProfile:
  - CreateMap<UserCreateDto, User>()
  - CreateMap<UserUpdateDto, User>()
  - CreateMap<User, UserDto>()
                                       ↓
Los registra automáticamente en el DI container
                                       ↓
Cuando inyectas IMapper en Business Layer:
  private readonly IMapper _mapper;
  
  _mapper.Map<UserDto>(user)  // Funciona automáticamente



  ///// For migrations the first commad is 

  Initial Base creational: 
  Add-Migration InitialMigration -Context ApplicationDbContext -Project Data -StartupProject Web

  Execute Physical Tables on Bd:
  Update-Database -Context ApplicationDbContext -Project Data -StartupProject Web