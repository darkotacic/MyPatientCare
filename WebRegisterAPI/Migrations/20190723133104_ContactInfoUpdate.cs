using Microsoft.EntityFrameworkCore.Migrations;

namespace WebRegisterAPI.Migrations
{
    public partial class ContactInfoUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactValue",
                table: "ContactInfo",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactValue",
                table: "ContactInfo");
        }
    }
}
