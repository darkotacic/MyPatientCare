using Microsoft.EntityFrameworkCore.Migrations;

namespace WebRegisterAPI.Migrations
{
    public partial class SeedFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_DoctorTypes_TypeId",
                table: "Treatments");

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Treatments",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "DoctorTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Surgeon" },
                    { 2, "Internist" },
                    { 3, "Neurologist" }
                });

            migrationBuilder.InsertData(
                table: "Hospitals",
                columns: new[] { "Id", "Address", "DirectorName", "Latitude", "Longitude", "Name", "PhoneNumber" },
                values: new object[,]
                {
                    { 1, "Bulevar Vojvode Stepe 44", "Josip Broz Tito", 45.267099999999999, 19.833500000000001, "Klinicki centar Vojvodina", "0245554441" },
                    { 2, "Beogradski put 120", "Zvonko Bogdan", 46.081349000000003, 19.672744000000002, "Drzavna bolnica Subotica", "0245554442" }
                });

            migrationBuilder.InsertData(
                table: "Treatments",
                columns: new[] { "Id", "Duration", "Name", "TypeId" },
                values: new object[] { 3, 20, "First check up", 1 });

            migrationBuilder.InsertData(
                table: "Treatments",
                columns: new[] { "Id", "Duration", "Name", "TypeId" },
                values: new object[] { 1, 30, "Massage", 2 });

            migrationBuilder.InsertData(
                table: "Treatments",
                columns: new[] { "Id", "Duration", "Name", "TypeId" },
                values: new object[] { 2, 120, "MRI", 3 });

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_DoctorTypes_TypeId",
                table: "Treatments",
                column: "TypeId",
                principalTable: "DoctorTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_DoctorTypes_TypeId",
                table: "Treatments");

            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Hospitals",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Treatments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Treatments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Treatments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DoctorTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DoctorTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DoctorTypes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AlterColumn<int>(
                name: "TypeId",
                table: "Treatments",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_DoctorTypes_TypeId",
                table: "Treatments",
                column: "TypeId",
                principalTable: "DoctorTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
