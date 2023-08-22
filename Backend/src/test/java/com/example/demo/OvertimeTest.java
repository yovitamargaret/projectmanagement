// package com.example.demo;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.example.demo.entities.Overtime;
// import com.example.demo.entities.Employee;
// import com.example.demo.entities.OvertimeType;
// import com.example.demo.entities.OvertimeSchedule;
// import com.example.demo.entities.OvertimeStatus;
// import com.example.demo.services.OvertimeService;

// @SpringBootTest
// public class OvertimeTest {
//     @Autowired
//     private OvertimeService overtimeService;

//     @Test
//     public void Save() {
//         Boolean expected = true;

//         Overtime overtime = new Overtime();
//         overtime.setSubmission_id(1); 
//         overtime.setEmployee_id(5); 
//         overtime.setSchedule_id(1); 
//         overtime.setType_id(1); 
//         overtime.setAssignment("Some Assignment"); 
//         overtime.setStatus(1); 

//         String dateString = "2023-08-02 08:00:00";
//         DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//         LocalDateTime localDateTime = LocalDateTime.parse(dateString, formatter);
//         overtime.setStartTime(localDateTime); 

//         LocalDateTime endTime = localDateTime.plusHours(2); 
//         overtime.setEndTime(endTime); 

//         Employee employee = new Employee();
//         employee.setEmployee_id(5);
//         employee.setFullname("Lisa");
//         employee.setPhone("0988745678");
//         employee.setJoinDate(localDateTime);
//         employee.setEmail("lisa@gmail.com");

        
//         OvertimeSchedule overtimeSchedule = new OvertimeSchedule();
//         overtimeSchedule.setSchedule_id(1);

//         OvertimeType overtimeType = new OvertimeType();
//         overtimeType.setType_id(1);

//         OvertimeStatus overtimeStatus = new OvertimeStatus();
//         overtimeStatus.setStatus_id(1);

//         overtime.setEmployee(employee);
//         overtime.setOvertimeSchedule(overtimeSchedule);
//         overtime.setOvertimeType(overtimeType);
//         overtime.setOvertimeStatus(overtimeStatus);

//         Boolean result = overtimeService.Save(overtime);

//         assertEquals(expected, result);
//     }

//     @Test
//     public void Delete() {
//         Boolean expected = true;
//         Integer submission_id = 1; 

//         Boolean result = overtimeService.Delete(submission_id);

//         assertEquals(expected, result);
//     }
// }
