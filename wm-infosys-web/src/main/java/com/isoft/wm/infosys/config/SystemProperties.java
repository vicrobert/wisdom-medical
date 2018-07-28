package com.isoft.wm.infosys.config;

public enum SystemProperties {
	_prop_1("spring.application.name", "application.name", "Application Name"),
	
	_prop_2("server.port", "server.port", "Server Port"),
	
	_prop_3("spring.dubbo.application.name", "application.name", "Dubbo Used Application Name"),
	
	_prop_4("spring.dubbo.registry.address", "dubbo.registry.url", "Dubbo Registry Location"),
	
	_prop_5("spring.dubbo.protocol.name", "dubbo.protocol.name", "Dubbo Protocol for RPC"),
	
	_prop_6("spring.dubbo.protocol.port", "dubbo.protocol.port", "Protocol Port"),
	
	_prop_7("spring.dubbo.base-package", "dubbo.base-package", "Package Location"),
	
	_prop_8("spring.dubbo.consumer.timeout", "dubbo.consumer.timeout", "Consumer Timeout Value"),
	
	_prop_9("spring.cloud.zookeeper.discovery.register", "zookeeper.discovery.register", "Should Register Itself to Zookeeper As Service Provider"),
	
	_prop_10("spring.cloud.zookeeper.discovery.root", "zookeeper.discovery.root", "Zookeeper Discovery Root"),
	
	_prop_11("spring.cloud.zookeeper.connect-string", "zookeeper.connect-string", "Zookeeper Server Location"),
	
	_prop_12("spring.datasource.url", "database.url", "Database Location"),
	
	_prop_13("spring.datasource.username", "database.username", "Database User Name"),
	
	_prop_14("spring.datasource.password", "database.password", "Database Password"),
	
	_prop_15("spring.datasource.driver-class-name", "database.driver-class-name", "Database Driver Type"),
	
	_prop_16("spring.jpa.properties.hibernate.hbm2ddl.auto", "jpa.properties.hibernate.hbm2ddl.auto", "ORM Action Type");
	
	/**
	 * TODO: _prop_n
	 * 	Adding some other properties here for extending
	 * ...
	 */
	
	/**
	 * @property inner name
	 */
	private String innerKey;
	
	/**
	 * @property outer name
	 */
	private String outerKey;
	
	/**
	 * @property property description
	 */
	private String desc;
	
	SystemProperties(String innerKey, String outerKey, String desc) {
		this.innerKey = innerKey;
		this.outerKey = outerKey;
		this.desc = desc;
	}

	public String getInnerKey() {
		return innerKey;
	}

	public void setInnerKey(String innerKey) {
		this.innerKey = innerKey;
	}

	public String getOuterKey() {
		return outerKey;
	}

	public void setOuterKey(String outerKey) {
		this.outerKey = outerKey;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
