using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteKeeperAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Önce nullable olarak ekle
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Notes",
                type: "text",
                nullable: true);

            // 2. Mevcut notlara ilk kullanıcının ID'sini ata
            migrationBuilder.Sql(@"
        UPDATE ""Notes"" 
        SET ""UserId"" = (
            SELECT ""Id"" 
            FROM ""AspNetUsers"" 
            ORDER BY ""Id""
            LIMIT 1
        )
        WHERE ""UserId"" IS NULL");

            // 3. Şimdi kolonu NOT NULL yap
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Notes",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            // 4. Index ve Foreign Key ekle
            migrationBuilder.CreateIndex(
                name: "IX_Notes_UserId",
                table: "Notes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_AspNetUsers_UserId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_UserId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Notes");
        }
    }
}
