using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TestingCenter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TestingCenters",
                columns: table => new
                {
                    Private_CenterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Public_CenterId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestingCenters", x => new { x.Public_CenterId, x.Private_CenterId });
                    table.ForeignKey(
                        name: "FK_TestingCenters_Private_Centers_Private_CenterId",
                        column: x => x.Private_CenterId,
                        principalTable: "Private_Centers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestingCenters_Public_Centers_Public_CenterId",
                        column: x => x.Public_CenterId,
                        principalTable: "Public_Centers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestingCenters_Private_CenterId",
                table: "TestingCenters",
                column: "Private_CenterId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestingCenters");
        }
    }
}
