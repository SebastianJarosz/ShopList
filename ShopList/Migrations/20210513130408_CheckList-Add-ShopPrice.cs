using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopList.Migrations
{
    public partial class CheckListAddShopPrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "ShopPrice",
                table: "CheckList",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShopPrice",
                table: "CheckList");
        }
    }
}
