using AutoMapper;
using Entity.dto.security.RoleFormPermission;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class RoleFormPermissionProfile : Profile
    {
        public RoleFormPermissionProfile() {
        
            CreateMap<RoleFormPermissionCreateDto, RoleFormPermission>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());

            CreateMap<RoleFormPermissionUpdateDto, RoleFormPermission>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore());

            CreateMap<RoleFormPermission, RoleFormPermissionDto>();
        }
    }
}
