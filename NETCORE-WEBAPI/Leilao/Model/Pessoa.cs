using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Leilao.Model
{
    public class Pessoa
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(250)]
        public string Nome { get; set; }

        [MaxLength(70)]
        public string Email { get; set; }

        [MaxLength(100)]
        public string Senha { get; set; }

        [Required]
        public int Idade { get; set; }

        public ICollection<Lances> Lances { get; set; }
    }
}
