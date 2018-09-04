package org.isoft.framework;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

import com.isoft.wm.infosys.api.InternetMedicalService;

import java.util.logging.Level;
import java.util.logging.Logger;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WisdomMedicalApplicationTests {
	private static Logger logger = Logger.getLogger("org.isoft.framework");

	@Test
	public void contextLoads() {
	}
	
	public static void main(String [] args)  throws Exception{
		
	        @SuppressWarnings("resource")
			ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"webui.xml"});
	        //context.start();
	        InternetMedicalService service = (InternetMedicalService)context.getBean("internetMedicalService"); // 获取远程服务代理
	        if (service != null) {
				logger.log(Level.WARNING, "SERVICE IS NOT NULL");
				logger.log(Level.WARNING, service.findHospitalByNameLike("MarriaK")); // 显示调用结果
	        } else {
				logger.log(Level.WARNING, "SERVICE IS  NULL!!!!!!!!!!!!!!!!!!");
	        }
	        
	   
	}

}
