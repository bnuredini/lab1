using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class PatientChronicDisease : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserChronic_Disease");

            migrationBuilder.CreateTable(
                name: "PatientChronicDisease",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    ChronicDiseaseId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientChronicDisease", x => new { x.AppUserId, x.ChronicDiseaseId });
                    table.ForeignKey(
                        name: "FK_PatientChronicDisease_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PatientChronicDisease_Chronic_Diseases_ChronicDiseaseId",
                        column: x => x.ChronicDiseaseId,
                        principalTable: "Chronic_Diseases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatientChronicDisease_ChronicDiseaseId",
                table: "PatientChronicDisease",
                column: "ChronicDiseaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientChronicDisease");

            migrationBuilder.CreateTable(
                name: "AppUserChronic_Disease",
                columns: table => new
                {
                    ChronicDiseaseId = table.Column<Guid>(type: "TEXT", nullable: false),
                    PatientId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserChronic_Disease", x => new { x.ChronicDiseaseId, x.PatientId });
                    table.ForeignKey(
                        name: "FK_AppUserChronic_Disease_AspNetUsers_PatientId",
                        column: x => x.PatientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserChronic_Disease_Chronic_Diseases_ChronicDiseaseId",
                        column: x => x.ChronicDiseaseId,
                        principalTable: "Chronic_Diseases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserChronic_Disease_PatientId",
                table: "AppUserChronic_Disease",
                column: "PatientId");
        }
    }
}
