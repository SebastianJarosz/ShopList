using AutoMapper;
using ShopList.DTO;
using ShopList.Models;
using ShopList.Models.ShopingListsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Mapper
{
    public class AutoMap: Profile
    {
        public AutoMap()
        {
            CreateMap<UserDTO, User>()
                .ForMember(d => d.Name, source => source.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, source => source.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, source => source.MapFrom(s => s.UserName));

            CreateMap<User, UserProfileDTO>()
                .ForMember(d => d.Name, source => source.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, source => source.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, source => source.MapFrom(s => s.UserName))
                .ForMember(d => d.RoleName, source => source.MapFrom(s => s.RoleName));

            CreateMap<CheckListDTO, CheckList>()
                .ForMember(d => d.ListName, source => source.MapFrom(s => s.ListName))
                .ForMember(d => d.ListPostion, source => source.MapFrom(s => s.ListPostion))
                .ForMember(d => d.LastModficationDate, source => source.MapFrom(s => s.LastModficationDate))
                .ForMember(d => d.CreationDate, source => source.MapFrom(s => s.CreationDate))
                .ForMember(d => d.Status, source => source.MapFrom(s => s.Status))
                .ForMember(d => d.ShopPrice, source => source.MapFrom(s => s.ShopPrice));

            CreateMap<CheckList, CheckListDTO>()
                .ForMember(d => d.Id, source => source.MapFrom(s => s.Id))
                .ForMember(d => d.ListName, source => source.MapFrom(s => s.ListName))
                .ForMember(d => d.ListPostion, source => source.MapFrom(s => s.ListPostion))
                .ForMember(d => d.LastModficationDate, source => source.MapFrom(s => s.LastModficationDate))
                .ForMember(d => d.CreationDate, source => source.MapFrom(s => s.CreationDate))
                .ForMember(d => d.Status, source => source.MapFrom(s => s.Status.ToString()));
        }
    }
}
