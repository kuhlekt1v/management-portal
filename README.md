# Management Portal
Notes and sample code for the development of a C# based manufacturing management portal.

## Initial Setup: Visual Studio 2019 WebAPI

*The following steps provide basic instructions for setting up a WebAPI. The instructions should be modified as necessary to meet your specific requirements.*

1. Begin a new project and select `ASP.Net Core WebAPI` (w. out OpenAPI). 
2. Add the following `NuGet` packages to the solution:

    ```
    - Microsoft.VisualStudio.Web.CodeGeneration.Desig
    - Microsoft.VisualStudio.Web.CodeGeneration.Utils
    - Microsoft.EntityFrameworkCore.SqlServer
    - Microsoft.EntityFrameworkCore.Tools
    ```

3. Add a Models folder.
   1. Add desired Model classes. For example...

        ```csharp
        namespace Portal.Models
        {
          public class Employee
          {
            public int Id { get; set; }
            public string EmployeeName { get; set; }
            public DateTime DateOfHire { get; set; }
            public Department Department { get; set; }
          }
        }
        ```

   2. Add `AppDbContext.cs` to Models folder.

        ```csharp
        using Microsoft.EntityFrameworkCore;

        namespace portal2.Models
        {
            public class AppDbContext : DbContext
            {
                public AppDbContext(DbContextOptions<AppDbContext> options)
                    :base(options){}
    
                public DbSet<Employee> Employees { get; set; }
            }
        }
        ```

4. In `Startup.cs` 
   1. Under `ConfigureServices` add the following:
      
      ```csharp
         services.AddDbContext<AppDbContext>(opt =>
           opt.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

         // Enable CORS.
         services.AddCors(c =>
         {
            c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin()
                                                         .AllowAnyMethod()
                                                         .AllowAnyHeader());
         });
      ```
   2. Under `Configure` add the following:
      
      ```
      app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      ```
      
5. In `appsettings.json` add the following below `"AllowedHosts": "*"`

     ```json
     "ConnectionStrings": {
       "DefaultConnection": "[connectionString]"
     }
     ```
     
6. Create a new local database via `Sql Server Object Explorer` in the `View` menu.

7. Expand the local database created in **Step 6** and display properties using `F4` or `[R-Click] -> Properties`.
   1. Copy the connection string and replace `[connectionString]` in **Step 5**.

8. Initialize migrations and seed the database.
   1. In `Package Manager Console` type the following commands:
   
        ```
        Add-Migration InitialState
        Update-Database
        Add-Migration SeedDatabase
        ```
   2. Open `[timeStamp]_SeedDatabase` from the Migrations folder. Enter the following (or similar) in `protected override void Up(MigrationBuilder migrationBuilder)`
   
        ```csharp
        // Seed Employee table.
        migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Jenny', '01/12/2018', 1)");
        migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Amanda', '04/27/2017', 2)");
        migrationBuilder.Sql("INSERT INTO dbo.Employees VALUES('Bill', '07/02/2020', 1)");
        ```
        
9. Change the `launchUrl` in both places in `Properties/launchSettings.json` to `"launchUrl": "api/employees"`.

10. Scaffold or manually develop the required controllers.
    1. To scaffold `[R-Click]` Controllers folder, `Add -> New Scaffolded Item..`, Select `API Controller with actions, using Entity Framework` (or desired).
