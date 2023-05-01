using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjeX_API.Data;
using ProjeX_API.DTOs;
using ProjeX_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task = ProjeX_API.Models.Task;


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
            return Ok(await _context.Projects.ToListAsync());
        }

        // GET: project/5
        [HttpGet("{id}")]
        // With project details, categories and tasks
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Projects.Include(p => p.Categories).ThenInclude(c => c.Tasks).FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
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
        public async Task<IActionResult> UpdateProject(int id, Project project)
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


        [HttpPost("{projectId}/user/{userId}")]
        public async Task<IActionResult> AddUserToProject(int userId, int projectId)
        {
            var user = await _context.Users.Include(u => u.Projects).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var project = await _context.Projects.Include(p => p.Users).FirstOrDefaultAsync(p => p.Id == projectId);

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


        [HttpGet("{projectId}/users")]
        public async Task<IActionResult> GetProjectUsers(int projectId) {

            var project = await _context.Projects.Include(p => p.Users).FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }
            var userDtos = project.Users.Select(u => new ProjectUserDto(u)).ToList();
            return Ok(userDtos.ToList());

        }

        [HttpDelete("{projectId}/user/{userId}")]
        public async Task<IActionResult> RemoveUserFromProject(int userId, int projectId)
        {
            var user = await _context.Users.Include(u => u.Projects).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var project = await _context.Projects.Include(p => p.Users).FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            if (!user.Projects.Any(p => p.Id == project.Id) || !project.Users.Any(u => u.Id == user.Id))
            {
                return BadRequest("User is not a member of this project.");
            }

            project.Users.Remove(user);
            user.Projects.Remove(project);

            try
            {
                await _context.SaveChangesAsync();
                return Ok("User removed from project successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while removing user from project: {ex.Message}");
            }
        }

        [HttpGet("{projectId}/user/{userId}/membership")]
        public ActionResult<bool> CheckMembershipStatus(int userId, int projectId)
        {
            var project = _context.Projects.Include(p => p.Users).FirstOrDefault(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            bool isMember = project.Users.Any(u => u.Id == userId);
            return Ok(isMember);
        }

        [HttpPost("{projectId}/categories")]
        public async Task<IActionResult> AddCategoryToProject(int projectId, CategoryCreateDto categoryDto)
        {
            var project = await _context.Projects.SingleOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound();
            }

            Category category = new Category
            {
                Name = categoryDto.Name
            };
           

            project.Categories.Add(category);
            await _context.SaveChangesAsync();

            return Ok("Category created successfully.");
        }

        [HttpPut("{projectId}/categories/{categoryId}")]
        public async Task<IActionResult> UpdateCategoryInProject(int projectId, int categoryId, [FromBody] Category updatedCategory)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound();
            }

            var category = project.Categories.FirstOrDefault(c => c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            category.Name = updatedCategory.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{projectId}/categories/{categoryId}")]
        public async Task<IActionResult> DeleteCategoryFromProject(int projectId, int categoryId)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound();
            }

            var category = project.Categories.FirstOrDefault(c => c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            project.Categories.Remove(category);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("categories/{categoryId}")]
        public async Task<ActionResult> AddTaskToCategory(int categoryId, Task task)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            category.Tasks.Add(task);

            await _context.SaveChangesAsync();

            return Ok("Task added Successfully");
        }

        [HttpPut("categories/{categoryId}/tasks/{taskId}")]
        public async Task<IActionResult> UpdateTaskInCategory(int categoryId, int taskId, [FromBody] Task updatedTask)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            var task = category.Tasks.SingleOrDefault(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound();
            }

            task.Name = updatedTask.Name;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;

            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("categories/{categoryId}/tasks/{taskId}")]
        public async Task<IActionResult> DeleteTaskFromCategory(int categoryId, int taskId)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(c => c.Id == categoryId);

            if (category == null)
            {
                return NotFound();
            }

            var task = category.Tasks.SingleOrDefault(t => t.Id == taskId);

            if (task == null)
            {
                return NotFound();
            }

            category.Tasks.Remove(task);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
