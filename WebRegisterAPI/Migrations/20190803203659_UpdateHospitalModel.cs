using Microsoft.EntityFrameworkCore.Migrations;

namespace WebRegisterAPI.Migrations
{
    public partial class UpdateHospitalModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Hospitals",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Hospitals");
        }
    }
}
