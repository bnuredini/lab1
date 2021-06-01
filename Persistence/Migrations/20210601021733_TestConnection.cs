using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TestConnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppUserTest",
                columns: table => new
                {
                    PatientId = table.Column<string>(type: "TEXT", nullable: false),
                    TestsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserTest", x => new { x.PatientId, x.TestsId });
                    table.ForeignKey(
                        name: "FK_AppUserTest_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserTest_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "TestTestingCenter",
                columns: table => new
                {
                    TestsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CentersPublic_CenterId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CentersPrivate_CenterId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestTestingCenter", x => new { x.TestsId, x.CentersPublic_CenterId, x.CentersPrivate_CenterId });
                    table.ForeignKey(
                        name: "FK_TestTestingCenter_TestingCenters_CentersPublic_CenterId_CentersPrivate_CenterId",
                        columns: x => new { x.CentersPublic_CenterId, x.CentersPrivate_CenterId },
                        principalTable: "TestingCenters",
                        principalColumns: new[] { "Public_CenterId", "Private_CenterId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestTestingCenter_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserTest_TestsId",
                table: "AppUserTest",
                column: "TestsId");

            migrationBuilder.CreateIndex(
                name: "IX_RezultTest_TestsId",
                table: "RezultTest",
                column: "TestsId");

            migrationBuilder.CreateIndex(
                name: "IX_TestTestingCenter_CentersPublic_CenterId_CentersPrivate_CenterId",
                table: "TestTestingCenter",
                columns: new[] { "CentersPublic_CenterId", "CentersPrivate_CenterId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserTest");

            migrationBuilder.DropTable(
                name: "RezultTest");

            migrationBuilder.DropTable(
                name: "TestTestingCenter");
        }
    }
}
