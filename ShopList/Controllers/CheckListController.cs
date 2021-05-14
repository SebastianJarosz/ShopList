using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopList.DTO;
using ShopList.Models;
using ShopList.Models.ShopingListsModel;
using ShopList.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckListController : ControllerBase
    {
        private readonly IMapper _mapper;
        private UserManager<User> _userManager;
        private AbstractCRUDCreator<CheckList, string> _checkListRepository;

        public CheckListController(IMapper mapper, UserManager<User> userManager,
             AbstractCRUDCreator<CheckList, string> checkListRepository)
        {
            _mapper = mapper;
            _userManager = userManager;
            _checkListRepository = checkListRepository;
        }

        // GET: api/<CheckListController>/AllCheckList/{status}
        [HttpGet("AllCheckList/{status}")]
        [Authorize]
        public async Task<Object> GetAllCheckList(string status)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
               
                return Ok((await _checkListRepository.GetAllAsync(userId, status))
                    .Select(checkList => _mapper.Map<CheckListDTO>(checkList))
                    .OrderBy(checkList => checkList.LastModficationDate));
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
        // GET: api/<CheckListController>/CheckList/{idList}
        [HttpGet("CheckList/{idList}")]
        [Authorize]
        public async Task<Object> GetCheckList(string idList)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var gotCheckList = await _checkListRepository.GetAsync(idList);
                if(gotCheckList != null && gotCheckList.UserId == userId) 
                {
                    return Ok((_mapper.Map<CheckListDTO>(_mapper.Map<CheckList>(gotCheckList))));  
                }
                
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }

        // PUT api/<CheckListController>/EditCheckList
        [HttpPut("EditCheckList")]
        [Authorize]
        public async Task<Object> PutEditCheckList(CheckListDTO model)
        {

            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var newObject = _mapper.Map<CheckList>(model);
                newObject.LastModficationDate = DateTime.Now;
                newObject.UserId = userId;
                return Ok((_mapper.Map<CheckListDTO>(await _checkListRepository.UpdateAsync(newObject, model.Id.ToString()))));
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }

        // POST api/<CheckListController>/DuplicateCheckList/{idList}
        [HttpPost("DuplicateCheckList/{idList}")]
        [Authorize]
        public async Task<Object> PostDuplicateCheckList(string idList)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var duplicatedCheckList = await _checkListRepository.GetAsync(idList);
                if (duplicatedCheckList != null && duplicatedCheckList.UserId == userId)
                {
                    duplicatedCheckList.CreationDate = DateTime.Now;
                    duplicatedCheckList.LastModficationDate = duplicatedCheckList.CreationDate;
                    duplicatedCheckList.Id = 0;
                    await _checkListRepository.AddAsync(duplicatedCheckList);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }
        // POST api/<CheckListController>/AddCheckList
        [HttpPost]
        [Authorize]
        [Route("AddCheckList")]
        public async Task<Object> PostAddCheckList(CheckListDTO model)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                
                if(model != null)
                {
                    model.CreationDate = DateTime.Now;
                    model.LastModficationDate = model.CreationDate;
                    model.ShopPrice = 0.0f;
                    var newObject = _mapper.Map<CheckList>(model);
                    newObject.User = await _userManager.FindByIdAsync(userId);
                    newObject.Status = CheckListStatus.Active;
                    return Ok(_mapper.Map<CheckListDTO>(await _checkListRepository.AddAsync(newObject)));
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }

        // POST api/<CheckListController>/ShareCheckList
        [HttpPost]
        [Route("ShareCheckList/{userEmail}/{idList}")]
        [Authorize]
        public async Task<Object> PostShareCheckList(string userEmail, string idList)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var sharedObject = await _checkListRepository.GetAsync(idList);
                if (sharedObject != null && sharedObject.UserId == userId)
                {
                    sharedObject.User = await _userManager.FindByEmailAsync(userEmail);
                    sharedObject.Status = CheckListStatus.Shered;
                    sharedObject.CreationDate = DateTime.Now;
                    sharedObject.LastModficationDate = sharedObject.CreationDate;
                    sharedObject.Id = 0;
                    return Ok(await _checkListRepository.AddAsync(sharedObject));
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }

        //DELETE api/<CheckListController>/Delete/{idList}
        [HttpDelete("Delete/{idList}")]
        [Authorize]
        public async Task<Object> DeleteCheckList(string idList)
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var checkListToDelete = await _checkListRepository.GetAsync(idList);
                if (checkListToDelete != null && checkListToDelete.UserId == userId)
                {
                    return Ok(await _checkListRepository.DeleteAsync(checkListToDelete));
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            return StatusCode(403);
        }
    }
}
