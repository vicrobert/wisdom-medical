#!/bin/bash
#################################################################
# Wisdom Medical Offline Package
# This package is suitable for deploying & running Wisdom
# Medical Information Platform out of the container 
# environment
# Author: Junbo.Yang
# mailto: junbo.yang@i-soft.com.cn
#################################################################
lines=`awk '/^__WM_BELOW__/ {print NR + 1; exit 0; }' $0`
probe=0
TMP_DIR=
ERRLOG=/var/log/wisdom_medical/insterr.log
ETC_CONF_HOME=/etc/wisdom_medical
CS_ETC_CONF=$ETC_CONF_HOME/crawler_service
DS_ETC_CONF=$ETC_CONF_HOME/disease_service
MS_ETC_CONF=$ETC_CONF_HOME/internet_medical_service
WEB_ETC_CONF=$ETC_CONF_HOME/web_service
SYSTEMD_SERVICE_DIR=/usr/lib/systemd/system
HOST=127.0.0.1
DBPASS=
TEMP_DBPASS=
INST_DIR=
OLD_MYSQLDB=0

show_cursor_mode() {
    if [ $1 -eq 0 ]; then
        echo -ne "\033[?25l"
    else
        echo -ne "\033[?25h"
    fi
}

show_result() {
    if [ $1 -eq 0 ]; then
        echo -en "\\033[55G[  \\033[1;32mOK\\033[0;39m  ]\n"
    elif [ $1 -eq 10 ]; then
        echo -en "\\033[55G[ \\033[1;33mSKIP\\033[0;39m ]\n"
    else
        echo -en "\\033[55G[\\033[1;31mFAILED\\033[0;39m]\n"
    fi
}

clean_up() {
    if ! [[ "z$TMP_DIR" == "z" ]]; then
        rm -fr $TMP_DIR
    fi
}

go_exit() {
    clean_up
    show_cursor_mode 1
    exit $1
}

config_cs() {
    mkdir -p $CS_ETC_CONF
    /bin/cp -n $INST_DIR/crawler_service/conf/* $CS_ETC_CONF
    sed -i "s/^.*database.url=.*$/database.url=jdbc:mysql:\/\/${HOST}:3306\/wm_crawler\?useUnicode=true\&characterEncoding=utf-8/g" $CS_ETC_CONF/web.properties
    sed -i "s/^.*database.username=.*$/database.username=root/g" $CS_ETC_CONF/web.properties
    sed -i "s/^.*zookeeper.connect-string=.*$/zookeeper.connect-string=${HOST}:2181/g" $CS_ETC_CONF/web.properties
    sed -i "s/^.*zookeeper.discovery.instance-host=.*$/zookeeper.discovery.instance-host=${HOST}/g" $CS_ETC_CONF/web.properties
}

config_cs_dbpass() {
    if [ -f $CS_ETC_CONF/web.properties ]; then
        sed -i "s/^.*database.password=.*$/database.password=$1/g" $CS_ETC_CONF/web.properties
        return 0
    fi
    return 1
}

config_ds() {
    mkdir -p $DS_ETC_CONF
    /bin/cp -n $INST_DIR/disease_service/conf/* $DS_ETC_CONF
    sed -i "s/^.*registry.server.url=.*$/registry.server.url=zookeeper:\/\/${HOST}:2181/g" $DS_ETC_CONF/disease_service.properties
    sed -i "s/^.*database.url=.*$/database.url=jdbc:mysql:\/\/${HOST}:3306\/wm_disease\?useUnicode=true\&characterEncoding=utf-8/g" $DS_ETC_CONF/disease_service.properties
    sed -i "s/^.*database.username=.*$/database.username=root/g" $DS_ETC_CONF/disease_service.properties
}

config_ds_dbpass() {
    if [ -f $DS_ETC_CONF/disease_service.properties ]; then
        sed -i "s/^.*database.password=.*$/database.password=$1/g" $DS_ETC_CONF/disease_service.properties
        return 0
    fi
    return 1
}

config_ms() {
    mkdir -p $MS_ETC_CONF
    /bin/cp -n $INST_DIR/internet_medical_service/conf/* $MS_ETC_CONF
    sed -i "s/^.*registry.server.url=.*$/registry.server.url=zookeeper:\/\/${HOST}:2181/g" $MS_ETC_CONF/internet_medical_service.properties
    sed -i "s/^.*database.url=.*$/database.url=jdbc:mysql:\/\/${HOST}:3306\/wm_internet_res\?useUnicode=true\&characterEncoding=utf-8/g" $MS_ETC_CONF/internet_medical_service.properties
    sed -i "s/^.*database.username=.*$/database.username=root/g" $MS_ETC_CONF/internet_medical_service.properties
}

config_ms_dbpass() {
    if [ -f $MS_ETC_CONF/internet_medical_service.properties ]; then
        sed -i "s/^.*database.password=.*$/database.password=$1/g" $MS_ETC_CONF/internet_medical_service.properties
        return 0
    fi
    return 1
}

config_web() {
    mkdir -p $WEB_ETC_CONF
    /bin/cp -n $INST_DIR/web_service/conf/* $WEB_ETC_CONF
    sed -i "s/^.*zookeeper.connect-string=.*$/zookeeper.connect-string=${HOST}:2181/g" $WEB_ETC_CONF/web.properties
    sed -i "s/^.*dubbo.registry.url=.*$/dubbo.registry.url=zookeeper:\/\/${HOST}:2181/g" $WEB_ETC_CONF/web.properties
    sed -i "s/^.*database.url=.*$/database.url=jdbc:mysql:\/\/${HOST}:3306\/wm_web\?useUnicode=true\&characterEncoding=utf-8/g" $WEB_ETC_CONF/web.properties
    sed -i "s/^.*database.username=.*$/database.username=root/g" $WEB_ETC_CONF/web.properties
}

config_web_dbpass() {
    if [ -f $WEB_ETC_CONF/web.properties ]; then
        sed -i "s/^.*database.password=.*$/database.password=$1/g" $WEB_ETC_CONF/web.properties
        return 0
    fi
    return 1
}

start_mysql_service() {
    systemctl start mysqld
    return 0
}

init_mysqldb_pass() {
    if [ "z$1" == "z" ]; then
        echo "ERROR: Tried to set a new password of mysqldb,but it was empty!" >>$ERRLOG
        return 1
    fi
    for i in {1..60}
    do
        passl=$(grep "A temporary password" /var/log/mysqld.log)
        TEMP_DBPASS=${passl##*: }
        if ! [ "z$TEMP_DBPASS" == "z" ]; then
            result=0
            break
        fi
        sleep 3
    done
    if [ $result -eq 0 ] && [ -e /usr/bin/mysql ]; then
        dbpass=\'$1\'
        /usr/bin/mysql -e "set password=password($dbpass)" --connect-expired-password -uroot -p"$TEMP_DBPASS" 2> /dev/null
        if ! [ $? -eq 0 ]; then
            echo "ERROR: Set password $dbpass failed!" >>$ERRLOG
            return 1
        fi
        return 0
    fi
    return 1
}

import_mysqldb() {
    if [ "z$1" == "z" ]; then
        echo "ERROR: Tried to import db,but the schema was not found." >>$ERRLOG
        return 1
    fi
    if [ -e /usr/bin/mysql ]; then
        if [ "z$2" == "z" ]; then
            /usr/bin/mysql -e "source $1" -uroot >/dev/null 2>>$ERRLOG
        else
            /usr/bin/mysql -e "source $1" -uroot -p"$2" >/dev/null 2>>$ERRLOG
        fi
        return $?
    fi
    return 1
}

initialize() {
    echo -n "Prepare to start..."
    mkdir -p $(dirname $ERRLOG)
    if ! [ $? -eq 0 ]; then
        show_result 1
        echo "ERROR: Could not create the directory of the log file, program exited!"
        go_exit 1
    fi
    if ! [ -e $ERRLOG ]; then
        touch $ERRLOG
        if ! [ $? -eq 0 ]; then
            show_result 1
            echo "ERROR: Could not create the log file, program exited!"
            go_exit 1
        fi
    fi
    TMP_DIR=$(mktemp -d /tmp/wmins.XXXXX)
    tail -n +"$lines" "$0" > "$TMP_DIR"/wmins.tar.gz
    tar -xvf $TMP_DIR/wmins.tar.gz -C $TMP_DIR > /dev/null 2>>$ERRLOG
    if ! [ $? -eq 0 ]; then
        show_result 1
        go_exit 1
    fi
    
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if ! [ -e $INST_DIR ]; then
            mkdir -p $INST_DIR
        fi
    #fi
    probe=$?
    show_result $probe
    return $probe
}

do_install_srv() {
    if [ $# -eq 8 ]; then
        if ! [ -e $1 ] || ! [ -e $2 ] || ! [ -e $3 ] || ! [ -e $4 ] || ! [ -e $8 ]; then
            echo "ERROR: The format of the run file mismatch!" >>$ERRLOG
            return 1
        fi
        src_bin=$1
        src_schema_dir=$2
        src_lib_dir=$3
        src_conf_dir=$4
        tar_bin_dir=$5
        tar_lib_dir=$6
        tar_conf_dir=$7
        lib_files_list=$8
        mkdir -p $tar_bin_dir $tar_lib_dir $tar_conf_dir
        files=$(cat $lib_files_list)
        for i in $files; do
            /bin/cp -f $src_lib_dir/$i $tar_lib_dir > /dev/null 2>>$ERRLOG
            probe=$?
            if ! [ $probe -eq 0 ]; then
                echo "ERROR: Copying $i to $tar_lib_dir encountered an error." >>$ERRLOG
                return $probe
            fi
        done
        /bin/cp -f $src_bin $tar_bin_dir > /dev/null 2>>$ERRLOG
        /bin/cp -f $src_schema_dir/* $tar_bin_dir > /dev/null 2>>$ERRLOG
        /bin/cp -f $src_conf_dir/*.properties $tar_conf_dir > /dev/null 2>>$ERRLOG
        /bin/cp -f $src_conf_dir/*.service $SYSTEMD_SERVICE_DIR
        probe=$?
        if ! [ $probe -eq 0 ]; then
            return $probe
        fi
        if [ -e $tar_bin_dir ]; then
            chmod +x -R $tar_bin_dir
        fi
    else
        echo "ERROR: Parameters of 'doinstall' mismatch!" >>$ERRLOG
        return 1
    fi
}

install_ms() {
    echo -n "Installing Internet Medical Service..."
    do_install_srv \
    $TMP_DIR/bin/internet-medical-service \
    $TMP_DIR/setup/dbschema/ms \
    $TMP_DIR/lib \
    $TMP_DIR/conf/internet_medical_service \
    $INST_DIR/internet_medical_service/bin \
    $INST_DIR/internet_medical_service/lib \
    $INST_DIR/internet_medical_service/conf \
    $TMP_DIR/setup/ms_lib_files
    show_result $?
}

install_ds() {
    echo -n "Installing Disease Analysis & Prediction Service..."
    do_install_srv \
    $TMP_DIR/bin/disease-service \
    $TMP_DIR/setup/dbschema/ds \
    $TMP_DIR/lib \
    $TMP_DIR/conf/disease_service \
    $INST_DIR/disease_service/bin \
    $INST_DIR/disease_service/lib \
    $INST_DIR/disease_service/conf \
    $TMP_DIR/setup/ds_lib_files
    show_result $?
}

install_cs() {
    echo -n "Installing Web Crawler Service..."
    do_install_srv \
    $TMP_DIR/bin/webcrawler-service \
    $TMP_DIR/setup/dbschema/cs \
    $TMP_DIR/lib \
    $TMP_DIR/conf/crawler_service \
    $INST_DIR/crawler_service/bin \
    $INST_DIR/crawler_service/lib \
    $INST_DIR/crawler_service/conf \
    $TMP_DIR/setup/cs_lib_files
    show_result $?
}

install_web() {
    echo -n "Installing Web Frontend..."
    do_install_srv \
    $TMP_DIR/bin/web-service \
    $TMP_DIR/setup/dbschema/web \
    $TMP_DIR/lib \
    $TMP_DIR/conf/web_service \
    $INST_DIR/web_service/bin \
    $INST_DIR/web_service/lib \
    $INST_DIR/web_service/conf \
    $TMP_DIR/setup/web_lib_files
    show_result $?
}

install_mysqldb() {
    if [ -f /usr/sbin/mysqld ]; then
        OLD_MYSQLDB=1
        echo -n "Installing MysqlDB..."
        show_result 10
        echo "WARNING: An old mysqldb has been detected,nothing to do but skip!">>$ERRLOG
        return 10
    fi
    if [ -e $TMP_DIR/db ]; then
        dbfcnt=$(ls $TMP_DIR/db/*.rpm|wc -w)
        if ! [ $dbfcnt -eq 0 ]; then
            echo -n "Installing MysqlDB..."
            rpm -Uvh $TMP_DIR/db/*.rpm --force > /dev/null 2>>$ERRLOG
            probe=$?
            show_result $probe
            if [ $probe -eq 0 ]; then
                return $probe
            fi
        fi
    fi
    echo "ERROR: MysqlDB not exists in this package file."
    return 1
}

install_zk() {
    if [ -e $TMP_DIR/zk ]; then
        zkfcnt=$(ls $TMP_DIR/zk/*|wc -w)
        if ! [ $zkfcnt -eq 0 ]; then
            echo -n "Installing Zookeeper..."
            /bin/cp -fr $TMP_DIR/zk $INST_DIR > /dev/null 2>>$ERRLOG
            /bin/mv $INST_DIR/zk/conf/zk.service /usr/lib/systemd/system > /dev/null 2>>$ERRLOG
            probe=$?
            show_result $probe
            return $probe
        fi
    fi
    echo "ERROR: Zookeeper not exists in this package file."
    return 1
}

post_install_all() {
    echo -n "System initializing..."
    # systemd service daemon reload
    systemctl daemon-reload
    # configure each module
    config_cs
    config_ds
    config_ms
    config_web
    # configure database
    if [ $OLD_MYSQLDB -eq 1 ]; then
        show_result $?
        echo "WARNING: An old mysqldb has been detected,do nothing about configuration!"
        return 0
    fi
    if [ -e /usr/bin/openssl ]; then
        start_mysql_service
        if [ $? -eq 0 ]; then
            newpass=$(/usr/bin/openssl rand 14 -base64 | sed "s/\//+/g")
            init_mysqldb_pass $newpass
            if [ $? -eq 0 ]; then
                config_cs_dbpass $newpass
                config_ds_dbpass $newpass
                config_ms_dbpass $newpass
                config_web_dbpass $newpass
                if [ $? -eq 0 ]; then
                    cs_db_schema=$INST_DIR/crawler_service/bin/database-schema.sql
                    ds_db_schema=$INST_DIR/disease_service/bin/database-schema.sql
                    ms_db_schema=$INST_DIR/internet_medical_service/bin/database-schema.sql
                    web_db_schema=$INST_DIR/web_service/bin/database-schema.sql
                    if [ -f $ms_db_schema ]; then
                        import_mysqldb $ms_db_schema $newpass
                        if ! [ $? -eq 0 ]; then                        
                            show_result 1
                            echo "ERROR: Import ms_db_schema failed." >>$ERRLOG
                            return 1
                        fi
                    fi
                    if [ -f $web_db_schema ]; then
                        import_mysqldb $web_db_schema $newpass
                        if ! [ $? -eq 0 ]; then
                            show_result 1
                            echo "ERROR: Import web_db_schema failed." >>$ERRLOG
                            return 1
                        fi
                    fi
                    if [ -f $cs_db_schema ]; then
                        import_mysqldb $cs_db_schema $newpass
                        if ! [ $? -eq 0 ]; then
                            show_result 1
                            echo "ERROR: Import cs_db_schema failed." >>$ERRLOG
                            return 1
                        fi
                    fi
                    if [ -f $ds_db_schema ]; then
                        import_mysqldb $ds_db_schema $newpass
                        if ! [ $? -eq 0 ]; then                        
                            show_result 1
                            echo "ERROR: Import ds_db_schema failed." >>$ERRLOG
                            return 1
                        fi
                    fi
                    show_result $?
                    return 0
                else
                    show_result 1
                    echo "ERROR: Configure dbpass to configuration file failed."
                    return 1
                fi
            else
                echo "ERROR: init_mysqldb_pass abnormal." >>$ERRLOG
                show_result 1
                return 1
            fi
        else
            echo "ERROR: Start mysql service failed." >>$ERRLOG
            show_result 1
            return 1
        fi
    else
        show_result 0
        echo "WARNING: Openssl utilities not found, please specify the db password after installation."
        return 0
    fi
}

install_all() {
    install_ms
    install_ds
    install_cs
    install_web
    install_mysqldb
    install_zk
}

uninstall_ms() {
    echo -n "Uninstalling Internet Medical Service..."
    # systemd service
    if [ -f $SYSTEMD_SERVICE_DIR/wm-infosys-internet-medical.service ]; then
        systemctl stop wm-infosys-internet-medical.service
        systemctl disable wm-infosys-internet-medical.service > /dev/null 2>>$ERRLOG
        rm -f $SYSTEMD_SERVICE_DIR/wm-infosys-internet-medical.service
        systemctl daemon-reload
    fi
    # etc
    if [ -e $MS_ETC_CONF ]; then
        rm -fr $MS_ETC_CONF
    fi
    # work directory
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR/internet_medical_service ]; then
            rm -fr $INST_DIR/internet_medical_service
        fi
    #fi
    show_result 0
    return 0
}

uninstall_ds() {
    echo -n "Uninstalling Disease Analysis and Prediction service..."
    # systemd service
    if [ -f $SYSTEMD_SERVICE_DIR/wm-infosys-disease.service ]; then
        systemctl stop wm-infosys-disease.service
        systemctl disable wm-infosys-disease.service > /dev/null 2>>$ERRLOG
        rm -f $SYSTEMD_SERVICE_DIR/wm-infosys-disease.service
        systemctl daemon-reload
    fi
    # etc
    if [ -e $DS_ETC_CONF ]; then
        rm -fr $DS_ETC_CONF
    fi
    # work directory
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR/disease_service ]; then
            rm -fr $INST_DIR/disease_service
        fi
    #fi
    show_result 0
    return 0
}

uninstall_cs() {
    echo -n "Uninstalling Web Crawler Service..."
    # systemd service
    if [ -f $SYSTEMD_SERVICE_DIR/wm-infosys-webcrawler.service ]; then
        systemctl stop wm-infosys-webcrawler.service
        systemctl disable wm-infosys-webcrawler.service > /dev/null 2>>$ERRLOG
        rm -f $SYSTEMD_SERVICE_DIR/wm-infosys-webcrawler.service
        systemctl daemon-reload
    fi
    # etc
    if [ -e $CS_ETC_CONF ]; then
        rm -fr $CS_ETC_CONF
    fi
    # work directory
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR/crawler_service ]; then
            rm -fr $INST_DIR/crawler_service
        fi
    #fi
    show_result 0
    return 0
}

uninstall_web() {
    echo -n "Uninstalling Web Frontend..."
    # systemd service
    if [ -f $SYSTEMD_SERVICE_DIR/wm-infosys-web.service ]; then
        systemctl stop wm-infosys-web.service
        systemctl disable wm-infosys-web.service > /dev/null 2>>$ERRLOG
        rm -f $SYSTEMD_SERVICE_DIR/wm-infosys-web.service
        systemctl daemon-reload
    fi
    # etc
    if [ -e $WEB_ETC_CONF ]; then
        rm -fr $WEB_ETC_CONF
    fi
    # work directory
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR/web_service ]; then
            rm -fr $INST_DIR/web_service
        fi
    #fi
    show_result 0
    return 0
}

uninstall_zk() {
    echo -n "Uninstalling Zookeeper..."
    # systemd service
    if [ -f $SYSTEMD_SERVICE_DIR/zk.service ]; then
        systemctl stop zk.service
        systemctl disable zk.service > /dev/null 2>>$ERRLOG
        rm -f $SYSTEMD_SERVICE_DIR/zk.service
        systemctl daemon-reload
    fi
    # work directory
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR/zk ]; then
            rm -fr $INST_DIR/zk
        fi
    #fi
    show_result 0
    return 0
}

uninstall_all_excluding_mysqldb() {
    uninstall_ms
    uninstall_ds
    uninstall_cs
    uninstall_web
    uninstall_zk
    # etc
    if [ -e $ETC_CONF_HOME ]; then
        rm -fr $ETC_CONF_HOME
    fi
    # home
    # For version 1.0 we only use '/usr/local' as its default path
    #if [ "z$INST_DIR" == "z" ]; then
        INST_DIR=/usr/local/wisdom_medical
        if [ -e $INST_DIR ]; then
            rm -fr $INST_DIR
        fi
    #fi
    echo "complete."
    return 0
}

all_in_one_complete_hint() {
    echo -e "Installation is complete.\nNew systemd services as follows:"
    echo -e "\twm-infosys-internet-medical.service\n\twm-infosys-disease.service"
    echo -e "\twm-infosys-webcrawler.service\n\twm-infosys-web.service"
    echo -e "\tmysqld.service\n\tzk.service"
    echo "See systemctl --help for details."
}

ms_complete_hint() {
    echo -e "Internet Medical Service complete.\nNew systemd service as follows:"
    echo -e "\twm-infosys-internet-medical.service"
    echo "See systemctl --help for details."
}

ds_complete_hint() {
    echo -e "Disease Analysis & Prediction Service complete.\nNew systemd service as follows:"
    echo -e "\twm-infosys-disease.service"
    echo "See systemctl --help for details."
}

cs_complete_hint() {
    echo -e "Web Crawler Service complete.\nNew systemd service as follows:"
    echo -e "\twm-infosys-webcrawler.service"
    echo "See systemctl --help for details."
}

web_complete_hint() {
    echo -e "Web Frontend complete.\nNew systemd service as follows:"
    echo -e "\twm-infosys-web.service"
    echo "See systemctl --help for details."
}

mysqldb_complete_hint() {
    echo -e "MysqlDB complete.\nNew systemd service as follows:"
    echo -e "\tmysqld.service"
    echo "See systemctl --help for details."
}

zk_complete_hint() {
    echo -e "Zookeeper registry center complete.\nNew systemd service as follows:"
    echo -e "\tzk.service"
    echo "See systemctl --help for details."
}

go_opt1() {
    show_cursor_mode 0
    initialize
    install_all
    post_install_all
    clean_up
    all_in_one_complete_hint
    show_cursor_mode 1
}

go_opt2() {
    show_cursor_mode 0
    initialize
    install_ms
    config_ms
    clean_up
    ms_complete_hint
    show_cursor_mode 1
}

go_opt3() {
    show_cursor_mode 0
    initialize
    install_ds
    config_ds
    clean_up
    ds_complete_hint
    show_cursor_mode 1
}

go_opt4() {
    show_cursor_mode 0
    initialize
    install_cs
    config_cs
    clean_up
    cs_complete_hint
    show_cursor_mode 1
}

go_opt5() {
    show_cursor_mode 0
    initialize
    install_web
    config_web
    clean_up
    web_complete_hint
    show_cursor_mode 1
}

go_opt6() {
    show_cursor_mode 0
    initialize
    install_mysqldb
    clean_up
    mysqldb_complete_hint
    show_cursor_mode 1
}

go_opt7() {
    show_cursor_mode 0
    initialize
    install_zk
    clean_up
    zk_complete_hint
    show_cursor_mode 1
}

go_opt8() {
    show_cursor_mode 0
    uninstall_ms
    show_cursor_mode 1
}

go_opt9() {
    show_cursor_mode 0
    uninstall_ds
    show_cursor_mode 1
}

go_opt10() {
    show_cursor_mode 0
    uninstall_cs
    show_cursor_mode 1
}

go_opt11() {
    show_cursor_mode 0
    uninstall_web
    show_cursor_mode 1
}

go_opt12() {
    show_cursor_mode 0
    uninstall_zk
    show_cursor_mode 1
}

go_opt13() {
    show_cursor_mode 0
    uninstall_all_excluding_mysqldb
    show_cursor_mode 1
}

start() {
    menu_opt1="Install_All_In_One"
    menu_opt2="Install_Internet_Medical_Service"
    menu_opt3="Install_Disease_Analysis&Prediction_Service"
    menu_opt4="Install_Web_Crawler_Service"
    menu_opt5="Install_Web_Frontend"
    menu_opt6="Install_MysqlDB(v5.7.22)"
    menu_opt7="Install_Zookeeper(v3.4.12)"
    menu_opt8="Uninstall_Internet_Medical_Service"
    menu_opt9="Uninstall_Disease_Analysis&Prediction"
    menu_opt10="Uninstall_Web_Crawler_Service"
    menu_opt11="Uninstall_Web_Frontend"
    menu_opt12="Uninstall_Zookeeper"
    menu_opt13="Uninstall_All_Excluding_MysqlDB"
    menu_opt14="Quit"
    echo "===================================================================="
    echo "  Welcome to Wisdom Medical Information Platform Installation v1.0"
    echo "===================================================================="
    echo "Please select an option:"
    select opt in $menu_opt1 $menu_opt2 $menu_opt3 $menu_opt4 $menu_opt5 $menu_opt6 \
        $menu_opt7 $menu_opt8 $menu_opt9 $menu_opt10 $menu_opt11 $menu_opt12 \
        $menu_opt13 $menu_opt14
    do
    case $opt in
        $menu_opt1) go_opt1
        ;;
        $menu_opt2) go_opt2
        ;;
        $menu_opt3) go_opt3
        ;;
        $menu_opt4) go_opt4
        ;;
        $menu_opt5) go_opt5
        ;;
        $menu_opt6) go_opt6
        ;;
        $menu_opt7) go_opt7
        ;;
        $menu_opt8) go_opt8
        ;;
        $menu_opt9) go_opt9
        ;;
        $menu_opt10) go_opt10
        ;;
        $menu_opt11) go_opt11
        ;;
        $menu_opt12) go_opt12
        ;;
        $menu_opt13) go_opt13
        ;;
        $menu_opt14)
        break;;
    esac
    done
}

until [ $# -eq 0 ]
do
    case $1 in
    -h|--help)
        echo "Usage: $0 [{1..14}] [-h | --help] [-v | --version]"
        echo -e "\n\t{1..14}\t\t Option selected."
        echo -e "\t-h --help\t Show this help."
        echo -e "\t-v --version\t Show version.\n"
        exit 0
    ;;
    -v|--version)
        echo "Version 1.0.0-el7.x86_64"
        exit 0
    ;;
    14) exit 0
    ;;
    1)
        go_opt1
        go_exit 0
    ;;
    2)
        go_opt2
        go_exit 0
    ;;
    3)
        go_opt3
        go_exit 0
    ;;
    4)
        go_opt4
        go_exit 0
    ;;
    5)
        go_opt5
        go_exit 0
    ;;
    6)
        go_opt6
        go_exit 0
    ;;
    7)
        go_opt7
        go_exit 0
    ;;
    8)
        go_opt8
        go_exit 0
    ;;
    9)
        go_opt9
        go_exit 0
    ;;
    10)
        go_opt10
        go_exit 0
    ;;
    11)
        go_opt11
        go_exit 0
    ;;
    12)
        go_opt12
        go_exit 0
    ;;
    13)
        go_opt13
        go_exit 0
    ;;
    *) shift
    ;;
    esac
done
start
if ! [ $? -eq 0 ]; then
    echo "Installation aborted!!!"
fi
go_exit 0
__WM_BELOW__
