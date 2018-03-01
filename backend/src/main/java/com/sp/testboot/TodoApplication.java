package com.sp.testboot;

import com.sp.testboot.task.domain.Task;
import com.sp.testboot.task.repository.TaskRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.util.ArrayList;
import java.util.stream.Stream;

@SpringBootApplication
@ComponentScan("com.sp.testboot.task")
public class TodoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Bean
    ApplicationRunner run(TaskRepository taskRepository) {
        return args -> Stream.of("Work1", "See a doctor", "Meet my friend", "Buy products")
                             .forEach(taskName -> taskRepository.save(new Task(0, taskName, "Test", new ArrayList<>())));
    }
}

//class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        return new InMemoryUserDetailsManager(Collections.singleton(User.withUsername("rwinch").roles("ADMIN").password("pw").build()));
//    }
//
//}
//
//@Component
//class CustomHealthIndicator implements HealthIndicator {
//    @Override
//    public Health health() {
//        return Health.status("Hey hey from custom status").build();
//    }
//}
//
//@RestController
//class CustomerRestController {
//
//    private final CustomerRepository customerRepository;
//
//    public CustomerRestController(CustomerRepository customerRepository) {
//        this.customerRepository = customerRepository;
//    }
//
//    @GetMapping("/customers")
//    Collection<Customer> customerCollection() {
//        return this.customerRepository.findAll();
//    }
//}
//
//interface CustomerRepository extends JpaRepository<Customer, Long> {
//
//}
//
//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//class Customer {
//
//    @Id
//    @GeneratedValue
//    private long id;
//    private String name;
//}



