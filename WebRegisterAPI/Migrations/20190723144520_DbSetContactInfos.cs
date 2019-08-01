using Microsoft.EntityFrameworkCore.Migrations;

namespace WebRegisterAPI.Migrations
{
    public partial class DbSetContactInfos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactInfo_AspNetUsers_ContactUserId",
                table: "ContactInfo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactInfo",
                table: "ContactInfo");

            migrationBuilder.RenameTable(
                name: "ContactInfo",
                newName: "ContactInfos");

            migrationBuilder.RenameIndex(
                name: "IX_ContactInfo_ContactUserId",
                table: "ContactInfos",
                newName: "IX_ContactInfos_ContactUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactInfos",
                table: "ContactInfos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactInfos_AspNetUsers_ContactUserId",
                table: "ContactInfos",
                column: "ContactUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContactInfos_AspNetUsers_ContactUserId",
                table: "ContactInfos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactInfos",
                table: "ContactInfos");

            migrationBuilder.RenameTable(
                name: "ContactInfos",
                newName: "ContactInfo");

            migrationBuilder.RenameIndex(
                name: "IX_ContactInfos_ContactUserId",
                table: "ContactInfo",
                newName: "IX_ContactInfo_ContactUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactInfo",
                table: "ContactInfo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ContactInfo_AspNetUsers_ContactUserId",
                table: "ContactInfo",
                column: "ContactUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
