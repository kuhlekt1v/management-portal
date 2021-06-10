using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace portal2.Models
{
    public class EmployeeDTO
    {
        public int Id { get; set; }

        [Display(Name="Full Name")]
        public string EmployeeName { get; set; }


        public DateTime DateOfHire { get; set; }

        [Display(Name = "Hired On")]
        public string DateString { get; set; }

        public string DepartmentName { get; set; }

        public EmployeeDTO(Employee e)
        {
            Id = e.Id;
            EmployeeName = e.EmployeeName;
            DateOfHire = e.DateOfHire;
            DepartmentName = e.Department.DepartmentName;
            DateString = e.DateOfHire.ToString("dd/MM/yyyy");
        }
    }
}
