package com.sp.testboot.task.controller;

import com.sp.testboot.task.domain.Task;
import com.sp.testboot.task.repository.TaskRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/task")
    public List<Task> allTask() {
        return taskRepository.findAll();
    }

}

