using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Leilao.Data;
using Leilao.Model;
using System.Globalization;
using ClosedXML.Excel;
using System.IO;

namespace Leilao.Controllers
{
  

    [Route("api/[controller]")]
    [ApiController]
    public class LancesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LancesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Lances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lances>>> GetLances()
        {
           

            return await _context.Lances.ToListAsync();
        }

        // GET: api/Lances
        [HttpGet]
        [Route("GetLancesInfo")]
        public async Task<ActionResult<IEnumerable<LanceGet>>> GetLancesInfo()
        {
            CultureInfo culture = new CultureInfo("pt-BR");
            var results = from c in _context.Lances
                          join pe in _context.Pessoas on c.PessoaId equals pe.Id
                          join pd in _context.Produtos on c.ProdutoId equals pd.Id
                          select new LanceGet
                          {
                              IdLance = c.Id,
                              Pessoa = pe.Nome,
                              Produto = pd.Nome,
                              ValorLance = c.Valor.ToString("C", culture),
                              DataLance = c.DataLance
                          };

            return await results.OrderByDescending(o=>o.DataLance).ToListAsync();
        }

        // GET: api/Lances
        [HttpGet]
        [Route("GetLancesExcel")]
        public ActionResult<string> GetLancesExcel()
        {
            string base64Encoded = "";
            CultureInfo culture = new CultureInfo("pt-BR");
            var results = from c in _context.Lances
                          join pe in _context.Pessoas on c.PessoaId equals pe.Id
                          join pd in _context.Produtos on c.ProdutoId equals pd.Id
                          select new LanceGet
                          {
                              IdLance = c.Id,
                              Pessoa = pe.Nome,
                              Produto = pd.Nome,
                              ValorLance = c.Valor.ToString("C", culture),
                              DataLance = c.DataLance
                          };

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Lances");
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Id";
                worksheet.Cell(currentRow, 2).Value = "Pessoa";
                worksheet.Cell(currentRow, 3).Value = "Produto";
                worksheet.Cell(currentRow, 4).Value = "Valor Lance";
                worksheet.Cell(currentRow, 5).Value = "Data Lance";
                foreach (var lance in results.OrderByDescending(o => o.DataLance))
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = lance.IdLance;
                    worksheet.Cell(currentRow, 2).Value = lance.Pessoa;
                    worksheet.Cell(currentRow, 3).Value = lance.Produto;
                    worksheet.Cell(currentRow, 4).Value = lance.ValorLance;
                    worksheet.Cell(currentRow, 5).Value = lance.DataLance;
                }
                
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    base64Encoded = System.Convert.ToBase64String(content);
                    /*return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "Lances.xlsx");*/
                }
            }

            return base64Encoded;
        }

        // GET: api/Lances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lances>> GetLances(int id)
        {
            var lances = await _context.Lances.FindAsync(id);

            if (lances == null)
            {
                return NotFound();
            }

            return lances;
        }

        // PUT: api/Lances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLances(int id, Lances lances)
        {
            if (id != lances.Id)
            {
                return BadRequest();
            }

            _context.Entry(lances).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LancesExists(id))
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

        // POST: api/Lances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lances>> PostLances(Lances lances)
        {
            var idade = _context.Pessoas.Where(p => p.Id.Equals(lances.PessoaId)).Select(s => s.Idade).FirstOrDefault();
            if(idade < 18)
            {
                return StatusCode(500, "Não é permitido lance para pessoas menor de 18 anos");
            }
            var valorProduto = _context.Produtos.Where(x => x.Id.Equals(lances.ProdutoId)).Select(s=>s.Valor).FirstOrDefault();
            var valorUltimoLance = _context.Lances.Where(x=>x.ProdutoId.Equals(lances.ProdutoId)).OrderBy(x=>x.Id).LastOrDefault();
            if (lances.Valor < 0)
            {
                return StatusCode(500, "Não é permitido lance com valor zero");
            }
            
            if (valorUltimoLance != null && lances.Valor <= valorUltimoLance.Valor)
            {
                return StatusCode(500, "Não é permitido lance menor ou igual do que o ultimo lance feito para este produto que é de " + valorUltimoLance.Valor.ToString("C", CultureInfo.GetCultureInfo("pt-BR")));
            }
            if (lances.Valor < valorProduto)
            {
                return StatusCode(500, "Não é permitido lance menor do que o valor do produto, valor do produto atual: " + valorProduto.ToString("C", CultureInfo.GetCultureInfo("pt-BR")));
            }
            lances.DataLance = DateTime.Now;

            _context.Lances.Add(lances);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLances", new { id = lances.Id }, lances);
        }

        // DELETE: api/Lances/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLances(int id)
        {
            var lances = await _context.Lances.FindAsync(id);
            if (lances == null)
            {
                return NotFound();
            }

            _context.Lances.Remove(lances);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LancesExists(int id)
        {
            return _context.Lances.Any(e => e.Id == id);
        }
    }
}
