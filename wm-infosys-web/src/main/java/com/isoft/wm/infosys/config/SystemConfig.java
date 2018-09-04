package com.isoft.wm.infosys.config;

import org.springframework.boot.SpringApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SystemConfig {
    private static final String CONFIG_FILE_ETC = "/etc/wisdom_medical/web_service/web.properties";
    private static final String CONFIG_FILE_CONF = System.getProperty("user.dir") + "/../conf/web.properties";
    private static final String CONFIG_FILE_DEFAULT = System.getProperty("user.dir") + "/conf/web.properties";
    private static final String IOEXCEPTION_ERROR_MSG = "配置文件 " + CONFIG_FILE_ETC + "," + CONFIG_FILE_CONF + "," + CONFIG_FILE_DEFAULT + " 或读取错误，请检查确认！";
    private static Properties props = new Properties();
    private static Logger logger = Logger.getLogger("com.isoft.wm.infosys.config");

    public static boolean loadPropertiesFromFile() {
        try {
            File file = new File(CONFIG_FILE_ETC);
            if (file.exists()) {
                InputStream in = new FileInputStream(CONFIG_FILE_ETC);
                props.load(in);
                return true;
            }
            file = new File(CONFIG_FILE_CONF);
            if (file.exists()) {
                InputStream in = new FileInputStream(CONFIG_FILE_CONF);
                props.load(in);
                return true;
            }
            file = new File(CONFIG_FILE_DEFAULT);
            if (file.exists()) {
                InputStream in = new FileInputStream(CONFIG_FILE_DEFAULT);
                props.load(in);
                return true;
            }
        } catch (IOException ex) {
            ex.printStackTrace();
            logger.log(Level.WARNING, IOEXCEPTION_ERROR_MSG);
        }
        return false;
    }

    public static void setProperties(SpringApplication app) {
        if (app != null) {
            Map<String, Object> realprops = new HashMap<>();
            for (SystemProperties sp : SystemProperties.values()) {
                realprops.put(sp.getInnerKey(), props.get(sp.getOuterKey()));
            }
            app.setDefaultProperties(realprops);
        }
    }
}
