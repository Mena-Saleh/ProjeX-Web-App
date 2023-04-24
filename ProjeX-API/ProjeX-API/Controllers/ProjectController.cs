using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjeX_API.Data;
using ProjeX_API.DTOs;
using ProjeX_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjeX_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjeXContext _context;

        public ProjectsController(ProjeXContext context)
        {
            _context = context;
        }

        // GET: project
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // GET: project/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return project;
        }

        // POST: project
        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateProject(int userId, [FromBody] ProjectCreateDto projectDto)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var project = new Project
                {
                    Name = projectDto.Name,
                    Description = projectDto.Description
                };

                _context.Projects.Add(project);
                await _context.SaveChangesAsync();

                await AddUserToProject(user.Id, project.Id);

                return Ok("Project created and user added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating project: {ex.Message}");
            }
        }

        // PUT: project/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Projects.Any(e => e.Id == id))
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

        // DELETE: project/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsByUserId(int userId)
        {
            try
            {
                var user = await _context.Users.Include(u => u.Projects).FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    return NotFound();
                }

                var projectDtos = user.Projects.Select(p => new ProjectDto(p)).ToList();


                return Ok(projectDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving projects from the database.");
            }
        }


        [HttpPost("user/{userId}/project/{projectId}")]
        public async Task<IActionResult> AddUserToProject(int userId, int projectId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            if (user.Projects.Any(p => p.Id == project.Id) || project.Users.Any(u => u.Id == user.Id))
            {
                return BadRequest("User is already a member of this project.");
            }

            project.Users.Add(user);
            user.Projects.Add(project);

            try
            {
                await _context.SaveChangesAsync();
                return Ok("User added to project successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while adding user to project: {ex.Message}");
            }
        }


    }
}
