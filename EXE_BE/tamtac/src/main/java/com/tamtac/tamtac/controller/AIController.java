package com.tamtac.tamtac.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    public void test() {
        System.out.println("Test");
    }

}

