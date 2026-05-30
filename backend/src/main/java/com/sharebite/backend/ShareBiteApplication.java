package com.sharebite.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class ShareBiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShareBiteApplication.class, args);
	}

    @Bean
    public CommandLineRunner checkDatabaseConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("=========================================================");
                System.out.println("SUCCESS: Connected to MySQL Database at " + connection.getMetaData().getURL());
                System.out.println("=========================================================");
            } catch (Exception e) {
                System.err.println("FAILED to connect to MySQL Database: " + e.getMessage());
            }
        };
    }
}
