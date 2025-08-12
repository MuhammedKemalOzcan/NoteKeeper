using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteKeeperAPI.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagName_UserId_Unique",
                table: "Tags",
                columns: new[] { "TagName", "UserId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tags_TagName_UserId_Unique",
                table: "Tags");
        }
    }
}
