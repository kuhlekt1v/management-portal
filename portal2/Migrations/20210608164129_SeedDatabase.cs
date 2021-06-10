using Microsoft.EntityFrameworkCore.Migrations;

namespace portal2.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Seed Department table.
            migrationBuilder.Sql("INSERT INTO dbo.Departments VALUES('IT')");
            migrationBuilder.Sql("INSERT INTO dbo.Departments VALUES('HR')");

            // Seed Employee table.
            migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Jenny', '01/12/2018', 1)");
            migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Amanda', '04/27/2017', 2)");
            migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Bill', '07/02/2020', 1)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
