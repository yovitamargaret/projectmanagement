// package com.example.demo;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.example.demo.entities.OvertimeSchedule;
// import com.example.demo.entities.OvertimeStatus;
// import com.example.demo.services.OvertimeScheduleService;

// import java.time.LocalDateTime;

// @SpringBootTest
// public class OvertimeScheduleTest {
//     @Autowired
//     private OvertimeScheduleService overtimeScheduleService;

//     @Test
//     public void save() {
//         Boolean expected = true;

//         OvertimeStatus overtimeStatus = new OvertimeStatus();
//         overtimeStatus.setStatus_id(1); 


//         OvertimeSchedule overtimeSchedule = new OvertimeSchedule();
//         overtimeSchedule.setSchedule_id(9);
//         overtimeSchedule.setSubmitDate(LocalDateTime.of(2023, 8, 2, 8, 0)); 
//         overtimeSchedule.setStatus_id(overtimeStatus); 

//         Boolean result = overtimeScheduleService.Save(overtimeSchedule);

//         assertEquals(expected, result);
//     }

//     @Test
//     public void Delete() {
//         Boolean expected = true;
//         Integer schedule_id = 9;

//         Boolean result = overtimeScheduleService.Delete(schedule_id);

//         assertEquals(expected, result);
//     }
// }
