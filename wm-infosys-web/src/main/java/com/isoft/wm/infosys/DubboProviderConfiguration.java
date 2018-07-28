
/*package com.isoft.wm.infosys;

import javax.annotation.Resource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ProtocolConfig;
import com.alibaba.dubbo.config.ProviderConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.rpc.Exporter;
*/
/**
 * 实现 dubbo 多端口注入
 * @author 杨钧博
 */
//@Configuration
//@ConditionalOnClass(Exporter.class)
//public class DubboProviderConfiguration {
//	@Resource(name="DiseaseServiceProtocolConfig")
//    private ProtocolConfig diseaseServiceProtocolConfig;
//	
//	@Bean(name = "DiseaseServiceProtocolConfig")
//    public ProtocolConfig ProtocolConfig() {
//        ProtocolConfig protocolConfig = new ProtocolConfig();
//        protocolConfig.setName("internetMedicalServiceStub");
//        protocolConfig.setPort(20881);
//        protocolConfig.setThreads(200);
//
//        return protocolConfig;
//	}
//	
//	@Bean(name = "DiseaseServiceProtocolConfig")
//    public ProviderConfig providerConfig(ApplicationConfig applicationConfig, RegistryConfig registryConfig) {
//        ProviderConfig providerConfig = new ProviderConfig();
//        providerConfig.setTimeout(30000);
//        providerConfig.setRetries(3);
//        providerConfig.setDelay(-1);
//        providerConfig.setApplication(applicationConfig);
//        providerConfig.setRegistry(registryConfig);
//        providerConfig.setProtocol(this.diseaseServiceProtocolConfig);
//        return providerConfig;
//    }
//}
