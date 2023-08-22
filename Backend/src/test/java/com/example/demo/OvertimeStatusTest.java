// package com.example.demo;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;


// import com.example.demo.services.OvertimeStatusService;

// @SpringBootTest
// public class OvertimeStatusTest {
//     @Autowired
//     private OvertimeStatusService overtimeStatusService;

//     @Test
//     public void save() {
//         Boolean expected = true;
//         com.example.demo.entities.OvertimeStatus overtimeStatus = new com.example.demo.entities.OvertimeStatus();  
//         overtimeStatus.setStatus_id(1);
//         overtimeStatus.setName("tes");

//         Boolean result = overtimeStatusService.Save(overtimeStatus);

//         assertEquals(expected, result);
//     }

//     @Test
//     public void Delete() {
//         Boolean expected = true;
//         Integer status_id = 9;

//         Boolean result = overtimeStatusService.Delete(status_id);

//         assertEquals(expected, result);
//     }
// }
