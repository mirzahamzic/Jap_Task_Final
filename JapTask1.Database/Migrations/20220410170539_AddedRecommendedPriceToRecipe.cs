using Microsoft.EntityFrameworkCore.Migrations;

namespace JapTask1.Database.Migrations
{
    public partial class AddedRecommendedPriceToRecipe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "RecomendedPrice",
                table: "Recipes",
                type: "float",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecomendedPrice",
                table: "Recipes");
        }
    }
}
