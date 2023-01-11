﻿using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public MemberController(SweetMouthContext context)
        {
            _context = context;
        }



        // GET: api/<MemberController>
        [HttpGet]
        public IEnumerable<Member> Get()
        {
            return _context.Member.Select(a =>
            new Member
            {
                MemberId= a.MemberId,
                Name= a.Name,
                NickName= a.NickName,
                Email= a.Email,
                PhoneNumber= a.PhoneNumber,
                Password= a.Password,
                BirthDay= a.BirthDay
            }
            );
        }

        // GET api/<MemberController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MemberController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<MemberController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MemberController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}