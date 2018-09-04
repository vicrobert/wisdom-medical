package com.isoft.wm.infosys.config;

public enum SystemProperties {
    _prop_1("spring.application.name", "application.name", "Application Name"),

    _prop_2("server.port", "server.port", "Server Port"),

    _prop_3("spring.cloud.zookeeper.connect-string", "zookeeper.connect-string", "Zookeeper Server Location"),

    _prop_4("spring.cloud.zookeeper.discovery.instance-host", "zookeeper.discovery.instance-host", "Zookeeper Discovery Instance Host"),

    _prop_5("spring.cloud.zookeeper.discovery.instance-port", "zookeeper.discovery.instance-port", "Zookeeper Discovery Instance Port"),

    _prop_6("spring.cloud.zookeeper.discovery.root", "zookeeper.discovery.root", "Zookeeper Discovery Root"),

    _prop_7("spring.cloud.zookeeper.enable", "zookeeper.enable", "Is Zookeeper Enabled"),

    _prop_8("spring.datasource.url", "database.url", "Database Location"),

    _prop_9("spring.datasource.username", "database.username", "Database User Name"),

    _prop_10("spring.datasource.password", "database.password", "Database Password"),

    _prop_11("spring.datasource.driver-class-name", "database.driver-class-name", "Database Driver Type"),

    _prop_12("spring.jpa.properties.hibernate.hbm2ddl.auto", "jpa.properties.hibernate.hbm2ddl.auto", "ORM Action Type");

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
