// package com.example.demo;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.text.ParseException;
// import java.text.SimpleDateFormat;

// import java.util.Date;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.example.demo.entities.Department;
// import com.example.demo.entities.Employee;
// import com.example.demo.services.DepartmentService;
// import com.example.demo.services.EmployeeService;


// @SpringBootTest
// public class EmployeeTest {
//     @Autowired
//     private EmployeeService employeeService;
//     @Autowired
//     private DepartmentService departmentService;

//     @Test
//     public void Save(){
//         Boolean expected = true;

//         Department department = departmentService.Get(7);


//         Employee employee = new Employee();
//         employee.setEmployee_id(40);
//         employee.setFullname("jenny");
//         employee.setPhone("81243516224");;
//         employee.setEmail("jenny@gmail.com");
//         employee.setDepartment(department);

//         String joinDateString = "2022-12-09";
//         try {
//             SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//             Date joinDate = dateFormat.parse(joinDateString);
//             employee.setJoindate(joinDate);
//         } catch (ParseException e) {
//             e.printStackTrace();
//         }

//         Boolean result = employeeService.Save(employee);

//         assertEquals(expected,result);


//     }
//     @Test
//     public void Delete(){
//         Boolean expected = true;
//         Integer employee_id = 22;

//         Boolean result = employeeService.Delete(employee_id);

//         assertEquals(expected, result);
//     }
    
// }
