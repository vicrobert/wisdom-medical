package com.isoft.wm.infosys;

import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.isoft.wm.infosys.config.SystemConfig;

@SpringBootApplication
//@EnableDiscoveryClient
//@EnableAutoConfiguration
public class CrawlerServiceApplication {
    public static void main(String[] args) throws Exception {
        if (SystemConfig.loadPropertiesFromFile()) {
            SpringApplication app = new SpringApplication(CrawlerServiceApplication.class);
            SystemConfig.setProperties(app);
            app.run(args);
        }
    }
}
