package com.isoft.wm.infosys.startup;

import com.isoft.wm.infosys.monitor.Monitor;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

@Service
public class InternetMedicalServiceApplication {
	public static void main(String [] args) throws IOException {
		@SuppressWarnings("resource")
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"wm-infosys-medicalservice.xml"});
		context.start();

		Monitor monitor = new Monitor();
		ScheduledThreadPoolExecutor schedThreadPoolExec = new ScheduledThreadPoolExecutor(1);
		schedThreadPoolExec.scheduleAtFixedRate(monitor, 0, monitor.getPeriod(), TimeUnit.SECONDS);
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				super.run();
				System.out.println("Internet medical service is ready to exit.");
			}
		});
        System.out.println("Internet medical service is now running...");
	}
}
