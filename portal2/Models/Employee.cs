using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace portal2.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public DateTime DateOfHire { get; set; }
        public Department Department { get; set; }
    }
}
