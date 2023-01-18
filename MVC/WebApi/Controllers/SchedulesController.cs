using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly SweetMouthContext _context;

        public SchedulesController(SweetMouthContext context)
        {
            _context = context;
        }

        // GET: api/Schedules
        [HttpGet]
        public async Task<IEnumerable<ClassDTO>> Get()
        {
            return _context.Schedule.Include(b => b.Member).Select(item => new ClassDTO
            {
                Date = item.Date,
                MemberId = item.MemberId,
                //ClassId = item.ClassId,
                ClassName = item.ClassName,

                MemberName = item.Member.Name,
                NickName = item.Member.NickName,
            });
        }

        // GET: api/Schedules/5
        [HttpGet("{date}")]
        public async Task<ActionResult<Schedule>> GetSchedule(DateTime id)
        {
            var schedule = await _context.Schedule.FindAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // PUT: api/Schedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule(DateTime id, Schedule schedule)
        {
            if (id != schedule.Date)
            {
                return BadRequest();
            }

            _context.Entry(schedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Schedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<Schedule> Post(ClassDTO Class)
        {
            Schedule cls = new Schedule
            {
                Date = Class.Date,
                MemberId = Class.MemberId,
                //ClassId = Class.ClassId,
                ClassName = Class.ClassName,
            };
            _context.Schedule.Add(cls);
            await _context.SaveChangesAsync();
            return cls;
        }

        // DELETE: api/Schedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(DateTime id)
        {
            var schedule = await _context.Schedule.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _context.Schedule.Remove(schedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScheduleExists(DateTime id)
        {
            return _context.Schedule.Any(e => e.Date == id);
        }
    }
}
