package com.isoft.wm.infosys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import com.isoft.wm.infosys.config.SystemConfig;

@SpringBootApplication
@EnableDiscoveryClient
public class WMInfoSysApplication {

    public static void main(String[] args) {
        //SpringApplication.run(WMInfoSysApplication.class, args);
        if (SystemConfig.loadPropertiesFromFile()) {
            SpringApplication app = new SpringApplication(WMInfoSysApplication.class);
            SystemConfig.setProperties(app);
            app.run(args);
        }
    }
}
