using AutoMapper;
using Entity.dto.security.Role;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<RoleCreateDto, Role>()
                .ForMember(dest => dest.Id, act => act.Ignore())
                .ForMember(dest => dest.CreatedAt, act => act.Ignore())
                .ForMember(dest => dest.DeletedAt, act => act.Ignore())
                .ForMember(dest => dest.UpdatedAt, act => act.Ignore())
                .ForMember(dest => dest.Status, act => act.Ignore());

            CreateMap<RoleUpdateDto, Role>()
                .ForMember(dest => dest.Id, act => act.Ignore())
                .ForMember(dest => dest.CreatedAt, act => act.Ignore())
                .ForMember(dest => dest.DeletedAt, act => act.Ignore())
                .ForMember(dest => dest.UpdatedAt, act => act.Ignore());

            CreateMap<Role, RoleDto>();
        }
    }
}
