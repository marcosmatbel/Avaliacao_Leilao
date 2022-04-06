using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Leilao.Migrations
{
    public partial class MudarTipoFoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Foto",
                table: "Produtos",
                type: "longblob",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "longblob");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "Foto",
                table: "Produtos",
                type: "longblob",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "blob");
        }
    }
}
