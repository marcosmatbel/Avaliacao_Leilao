using Leilao.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Leilao.Model
{
    public class Lances
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int PessoaId { get; set; }
        public Pessoa Pessoa { get; set; }

        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal Valor { get; set; }

        [Required]
        public DateTime DataLance { get; set; }

       
    }
}
