using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebWorker.Migrations
{
    /// <inheritdoc />
    public partial class AddInitialAuthProvider3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "InitialAuthProvider",
                table: "AspNetUsers",
                newName: "AuthProvider");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AuthProvider",
                table: "AspNetUsers",
                newName: "InitialAuthProvider");
        }
    }
}
