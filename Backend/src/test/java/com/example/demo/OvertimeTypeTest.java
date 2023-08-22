// package com.example.demo;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.example.demo.services.OvertimeTypeService;

// @SpringBootTest
// public class OvertimeTypeTest {
//     @Autowired
//     private OvertimeTypeService overtimeTypeService;

//     @Test
//     public void save() {
//         Boolean expected = true;
//         com.example.demo.entities.OvertimeType overtimeType = new com.example.demo.entities.OvertimeType();
//         overtimeType.setType_id(3);
//         overtimeType.setName("Overtime Type");

//         Boolean result = overtimeTypeService.Save(overtimeType);

//         assertEquals(expected, result);
//     }

//     @Test
//     public void Delete() {
//         Boolean expected = true;
//         Integer type_id = 9;

//         Boolean result = overtimeTypeService.Delete(type_id);

//         assertEquals(expected, result);
//     }
// }
