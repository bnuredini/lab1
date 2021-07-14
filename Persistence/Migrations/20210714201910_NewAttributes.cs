using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class NewAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RezultTest");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Rezults",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "TestId",
                table: "Rezults",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TestName",
                table: "Rezults",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PatientResults",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    ResultId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientResults", x => new { x.AppUserId, x.ResultId });
                    table.ForeignKey(
                        name: "FK_PatientResults_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PatientResults_Rezults_ResultId",
                        column: x => x.ResultId,
                        principalTable: "Rezults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rezults_TestId",
                table: "Rezults",
                column: "TestId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientResults_ResultId",
                table: "PatientResults",
                column: "ResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezults_Tests_TestId",
                table: "Rezults",
                column: "TestId",
                principalTable: "Tests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezults_Tests_TestId",
                table: "Rezults");

            migrationBuilder.DropTable(
                name: "PatientResults");

            migrationBuilder.DropIndex(
                name: "IX_Rezults_TestId",
                table: "Rezults");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Rezults");

            migrationBuilder.DropColumn(
                name: "TestId",
                table: "Rezults");

            migrationBuilder.DropColumn(
                name: "TestName",
                table: "Rezults");

            migrationBuilder.CreateTable(
                name: "RezultTest",
                columns: table => new
                {
                    ResultsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TestsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RezultTest", x => new { x.ResultsId, x.TestsId });
                    table.ForeignKey(
                        name: "FK_RezultTest_Rezults_ResultsId",
                        column: x => x.ResultsId,
                        principalTable: "Rezults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RezultTest_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RezultTest_TestsId",
                table: "RezultTest",
                column: "TestsId");
        }
    }
}
