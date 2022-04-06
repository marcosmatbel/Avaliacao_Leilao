using Microsoft.EntityFrameworkCore.Migrations;

namespace Leilao.Migrations
{
    public partial class lanceprodutos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProdutoId",
                table: "Lances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Lances_ProdutoId",
                table: "Lances",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lances_Produtos_ProdutoId",
                table: "Lances",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lances_Produtos_ProdutoId",
                table: "Lances");

            migrationBuilder.DropIndex(
                name: "IX_Lances_ProdutoId",
                table: "Lances");

            migrationBuilder.DropColumn(
                name: "ProdutoId",
                table: "Lances");
        }
    }
}
