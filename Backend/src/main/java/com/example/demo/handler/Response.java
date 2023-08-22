package com.example.demo.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {
    //2 param
    public static ResponseEntity<Object> generate(HttpStatus status, String message){
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("status", status.value());
        map.put("message", message);
        return new ResponseEntity<Object>(map, status);
    }

    //3param
        public static ResponseEntity<Object> generate(HttpStatus status, String message, Object data){
        Map<String, Object> map = new HashMap<String,Object>();
        map.put("status", status.value());
        map.put("message", message);
        map.put("data", data);
        return new ResponseEntity<Object>(map, status);
    }
}
