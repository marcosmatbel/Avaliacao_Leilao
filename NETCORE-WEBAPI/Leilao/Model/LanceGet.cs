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
    public class LanceGet
    {
        public int IdLance { get; set; }

        public string Pessoa { get; set; }

        public string Produto { get; set; }

        public string ValorProduto { get; set; }

        public string ValorLance { get; set; }


        public DateTime DataLance { get; set; }

       
    }
}
