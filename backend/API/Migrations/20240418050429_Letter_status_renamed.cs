using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class Letter_status_renamed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Letter");

            migrationBuilder.AddColumn<bool>(
                name: "IsRead",
                table: "Letter",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRead",
                table: "Letter");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Letter",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
