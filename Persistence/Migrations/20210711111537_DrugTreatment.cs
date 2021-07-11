using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class DrugTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TimeSpan",
                table: "Drugs",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Purpose",
                table: "Drugs",
                newName: "SideEffects");

            migrationBuilder.RenameColumn(
                name: "Perscribed",
                table: "Drugs",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Drugs",
                newName: "TimeSpan");

            migrationBuilder.RenameColumn(
                name: "SideEffects",
                table: "Drugs",
                newName: "Purpose");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Drugs",
                newName: "Perscribed");
        }
    }
}
