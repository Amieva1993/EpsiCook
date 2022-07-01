using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EpsiCook.Models;

namespace EpsiCook.Controllers
{
    [Route("api/CommandeItems")]
    [ApiController]
    public class CommandeItemsController : ControllerBase
    {
        private readonly CommandeContext _context;

        public CommandeItemsController(CommandeContext context)
        {
            _context = context;
        }

        // GET: api/CommandeItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommandeItem>>> GetCommandeItem()
        {
          if (_context.CommandeItem == null)
          {
              return NotFound();
          }
            return await _context.CommandeItem.ToListAsync();
        }

        // GET: api/CommandeItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommandeItem>> GetCommandeItem(int id)
        {
          if (_context.CommandeItem == null)
          {
              return NotFound();
          }
            var commandeItem = await _context.CommandeItem.FindAsync(id);

            if (commandeItem == null)
            {
                return NotFound();
            }

            return commandeItem;
        }

        // PUT: api/CommandeItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommandeItem(int id)
        {

            try
            {
                CommandeItem commandeItem = _context.CommandeItem.FirstOrDefault(w => w.Id == id);

                if (commandeItem != null)
                {
                    if (commandeItem.isCompleted == 0)
                    {
                        commandeItem.isCompleted = 1;

                    }
                    else if (commandeItem.isCompleted == 1) {
                        commandeItem.isCompleted = 2;

                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommandeItemExists(id))
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

        // POST: api/CommandeItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommandeItem>> PostCommandeItem(CommandeItem commandeItem)
        {
          if (_context.CommandeItem == null)
          {
              return Problem("Entity set 'CommandeContext.CommandeItem'  is null.");
          }
            _context.CommandeItem.Add(commandeItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommandeItem), new { id = commandeItem.Id }, commandeItem);
            //return CreatedAtAction("GetCommandeItem", new { id = commandeItem.Id }, commandeItem);
        }

        // DELETE: api/CommandeItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCommandeItem(int id)
        {
            if (_context.CommandeItem == null)
            {
                return NotFound();
            }
            var commandeItem = await _context.CommandeItem.FindAsync(id);
            if (commandeItem == null)
            {
                return NotFound();
            }

            _context.CommandeItem.Remove(commandeItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommandeItemExists(int id)
        {
            return (_context.CommandeItem?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
