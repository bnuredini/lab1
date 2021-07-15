using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateAppUserTestRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserTest");

            migrationBuilder.DropTable(
                name: "RezultTest");

            migrationBuilder.DropTable(
                name: "TestTestingCenter");

            migrationBuilder.DropTable(
                name: "TestVaccine");

            migrationBuilder.DropColumn(
                name: "HospitalId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "VaccineId",
                table: "Tests");

            migrationBuilder.RenameColumn(
                name: "Variation",
                table: "Tests",
                newName: "TestingCenterPublic_CenterId");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Tests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "Tests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RezultId",
                table: "Tests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TestingCenterPrivate_CenterId",
                table: "Tests",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tests_AppUserId",
                table: "Tests",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_RezultId",
                table: "Tests",
                column: "RezultId");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_TestingCenterPublic_CenterId_TestingCenterPrivate_CenterId",
                table: "Tests",
                columns: new[] { "TestingCenterPublic_CenterId", "TestingCenterPrivate_CenterId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_AspNetUsers_AppUserId",
                table: "Tests",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_Rezults_RezultId",
                table: "Tests",
                column: "RezultId",
                principalTable: "Rezults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_TestingCenters_TestingCenterPublic_CenterId_TestingCenterPrivate_CenterId",
                table: "Tests",
                columns: new[] { "TestingCenterPublic_CenterId", "TestingCenterPrivate_CenterId" },
                principalTable: "TestingCenters",
                principalColumns: new[] { "Public_CenterId", "Private_CenterId" },
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tests_AspNetUsers_AppUserId",
                table: "Tests");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_Rezults_RezultId",
                table: "Tests");

            migrationBuilder.DropForeignKey(
                name: "FK_Tests_TestingCenters_TestingCenterPublic_CenterId_TestingCenterPrivate_CenterId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_Tests_AppUserId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_Tests_RezultId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_Tests_TestingCenterPublic_CenterId_TestingCenterPrivate_CenterId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "Result",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "RezultId",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "TestingCenterPrivate_CenterId",
                table: "Tests");

            migrationBuilder.RenameColumn(
                name: "TestingCenterPublic_CenterId",
                table: "Tests",
                newName: "Variation");

            migrationBuilder.AddColumn<int>(
                name: "HospitalId",
                table: "Tests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Tests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VaccineId",
                table: "Tests",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateTable(
                name: "TestVaccine",
                columns: table => new
                {
                    TestsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    VaccinesId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestVaccine", x => new { x.TestsId, x.VaccinesId });
                    table.ForeignKey(
                        name: "FK_TestVaccine_Tests_TestsId",
                        column: x => x.TestsId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TestVaccine_Vaccines_VaccinesId",
                        column: x => x.VaccinesId,
                        principalTable: "Vaccines",
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

            migrationBuilder.CreateIndex(
                name: "IX_TestVaccine_VaccinesId",
                table: "TestVaccine",
                column: "VaccinesId");
        }
    }
}
