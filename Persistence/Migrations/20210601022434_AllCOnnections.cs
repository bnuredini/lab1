using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AllCOnnections : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.CreateTable(
                name: "RezultVariation",
                columns: table => new
                {
                    ResultsId = table.Column<Guid>(type: "TEXT", nullable: false),
                    VariationsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RezultVariation", x => new { x.ResultsId, x.VariationsId });
                    table.ForeignKey(
                        name: "FK_RezultVariation_Rezults_ResultsId",
                        column: x => x.ResultsId,
                        principalTable: "Rezults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RezultVariation_Variations_VariationsId",
                        column: x => x.VariationsId,
                        principalTable: "Variations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserChronic_Disease_PatientId",
                table: "AppUserChronic_Disease",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_RezultVariation_VariationsId",
                table: "RezultVariation",
                column: "VariationsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserChronic_Disease");

            migrationBuilder.DropTable(
                name: "RezultVariation");
        }
    }
}
