package com.sp.testboot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Stream;

@SpringBootApplication
public class TestbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestbootApplication.class, args);
	}

	@Bean
    ApplicationRunner run(CustomerRepository cr) {
        return args -> Stream.of("Jane", "Kate", "Bob", "Dave")
                             .forEach(x -> cr.save(new Customer(0, x)));
    }
}

class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Bean
    public UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(Collections.singleton(User.withUsername("rwinch").roles("ADMIN").password("pw").build()));
    }

}

@Component
class CustomHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        return Health.status("Hey hey from custom status").build();
    }
}

@RestController
class CustomerRestController {

    private final CustomerRepository customerRepository;

    public CustomerRestController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers")
    Collection<Customer> customerCollection() {
        return this.customerRepository.findAll();
    }
}

interface CustomerRepository extends JpaRepository<Customer, Long> {

}

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
class Customer {

    @Id
    @GeneratedValue
    private long id;
    private String name;
}



