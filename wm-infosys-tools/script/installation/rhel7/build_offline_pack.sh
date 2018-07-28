#!/bin/bash
#################################################################
# Build Installation Package All-In-One
# This package is suitable for deploying & running Wisdom Medical
# Information Platform out of the container environment
# Author: Junbo.Yang
# mailto: junbo.yang@i-soft.com.cn
#################################################################
#
PWD=`pwd`
BUILD_VERSION=
SKIP_COMPILE_FLAG=
INITSCRIPT=$PWD/init_script.sh
SELFEXTRACT=$PWD/self_extract.sh
SRC_BASE="$PWD/../../../.."
MS_LIB_SRC="$SRC_BASE/wm-infosys-medicalservice/target/lib"
DS_LIB_SRC="$SRC_BASE/wm-infosys-diseaseservice/target/lib"
CR_LIB_SRC="$SRC_BASE/wm-infosys-crawler/target"
WEB_LIB_SRC="$SRC_BASE/wm-infosys-web/target"
MS_CONF_SRC="$SRC_BASE/wm-infosys-medicalservice/conf"
DS_CONF_SRC="$SRC_BASE/wm-infosys-diseaseservice/conf"
CR_CONF_SRC="$SRC_BASE/wm-infosys-crawler/conf"
WEB_CONF_SRC="$SRC_BASE/wm-infosys-web/conf"
MS_DB_SCHEMA_SRC="$SRC_BASE/wm-infosys-medicalservice/script/database/database-schema.sql"
DS_DB_SCHEMA_SRC="$SRC_BASE/wm-infosys-diseaseservice/script/database/database-schema.sql"
CR_DB_SCHEMA_SRC="$SRC_BASE/wm-infosys-crawler/script/database/database-schema.sql"
WEB_DB_SCHEMA_SRC="$SRC_BASE/wm-infosys-web/script/database/database-schema.sql"
MS_BIN="$SRC_BASE/wm-infosys-medicalservice/script/internet-medical-service"
DS_BIN="$SRC_BASE/wm-infosys-diseaseservice/script/disease-service"
CR_BIN="$SRC_BASE/wm-infosys-crawler/script/webcrawler-service"
WEB_BIN="$SRC_BASE/wm-infosys-web/script/web-service"
MYSQL_SRC="$PWD/utilities/mysql"
ZK_SRC="$PWD/utilities/zookeeper"
TMP_DIR="$PWD/../../../.tmp"
SETUP_TAR="$TMP_DIR/setup"
LIB_TAR="$TMP_DIR/lib"
CONF_TAR="$TMP_DIR/conf"
BIN_TAR="$TMP_DIR/bin"
MS_CONF_TAR="$CONF_TAR/internet_medical_service"
DS_CONF_TAR="$CONF_TAR/disease_service"
CR_CONF_TAR="$CONF_TAR/crawler_service"
WEB_CONF_TAR="$CONF_TAR/web_service"
MS_DB_SCHEMA_TAR="$SETUP_TAR/dbschema/ms"
DS_DB_SCHEMA_TAR="$SETUP_TAR/dbschema/ds"
CR_DB_SCHEMA_TAR="$SETUP_TAR/dbschema/cs"
WEB_DB_SCHEMA_TAR="$SETUP_TAR/dbschema/web"
MYSQL_TAR="$TMP_DIR/db"
ZK_TAR="$TMP_DIR/zk"
TARGET="$PWD/../../../target"
OFFLINE_PACK_PREFIX="wm_install-1.0.0.el7-x86_64"
MVN=

make_version() {
    if [ "z$BUILD_VERSION" == "z" ]; then
        BUILD_VERSION="1.0.0"
    fi
    OFFLINE_PACK_PREFIX="wm_install-$BUILD_VERSION.el7-x86_64"
}

check_config_files() {
    if ! [ -e $MS_CONF_SRC ] || ! [ -e $ZK_SRC ] || ! [ -e $CR_CONF_SRC ] || ! [ -e $WEB_CONF_SRC ]; then
        echo "The configuration files of projects are incomplete, please create them first!"
        exit 1
    fi
    if ! [ -e $MS_LIB_SRC ] || ! [ -e $DS_LIB_SRC ] || ! [ -e $CR_LIB_SRC ] || ! [ -e $WEB_LIB_SRC ]; then
        echo "Please build all projects source first!"
        exit 1
    fi
    return 0
}

check_mysql_source() {
    if ! [ -e $MYSQL_SRC ]; then
        return 1
    fi
    return 0
}

check_zk_source() {
    if ! [ -e $ZK_SRC ]; then
        return 1
    fi
    return 0
}

analysis_lib_files() {
    if [ z$1 == "z" ]; then
        echo "'$1' path not exists!"
        return -1
    fi
    if [ z$2 == "z" ]; then
        echo "'$2' path not exists!"
        return -1
    fi
    echo -n "Start to analyse jar files from '$1'...   "
    arr="$(find $1 -name '*.jar')"
    for i in $arr; do
        echo $(basename ${i}) >> $2
    done
    echo "Done."
}

copy_to_workspace() {
    echo -n "Preparing workspace...   "
    rm -fr $TMP_DIR
    mkdir -p $LIB_TAR $MS_CONF_TAR $DS_CONF_TAR $CR_CONF_TAR $WEB_CONF_TAR $SETUP_TAR $BIN_TAR \
	$MS_DB_SCHEMA_TAR $DS_DB_SCHEMA_TAR $CR_DB_SCHEMA_TAR $WEB_DB_SCHEMA_TAR $MYSQL_TAR $ZK_TAR
    /bin/cp -f $MS_LIB_SRC/*.jar $LIB_TAR
    /bin/cp -n $DS_LIB_SRC/*.jar $LIB_TAR
    /bin/cp -n $CR_LIB_SRC/*.jar $LIB_TAR
    /bin/cp -n $WEB_LIB_SRC/*.jar $LIB_TAR
    /bin/cp -n $MS_BIN $BIN_TAR
    /bin/cp -n $DS_BIN $BIN_TAR
    /bin/cp -n $CR_BIN $BIN_TAR
    /bin/cp -n $WEB_BIN $BIN_TAR
    for i in $MS_CONF_SRC/*.sample;do /bin/cp -f $i $MS_CONF_TAR/$(basename $i | sed "s/.sample//g");done    
    for i in $DS_CONF_SRC/*.sample;do /bin/cp -f $i $DS_CONF_TAR/$(basename $i | sed "s/.sample//g");done
    for i in $CR_CONF_SRC/*.sample;do /bin/cp -f $i $CR_CONF_TAR/$(basename $i | sed "s/.sample//g");done
    for i in $WEB_CONF_SRC/*.sample;do /bin/cp -f $i $WEB_CONF_TAR/$(basename $i | sed "s/.sample//g");done
    /bin/cp -f $MS_DB_SCHEMA_SRC $MS_DB_SCHEMA_TAR
    /bin/cp -f $DS_DB_SCHEMA_SRC $DS_DB_SCHEMA_TAR
    /bin/cp -f $CR_DB_SCHEMA_SRC $CR_DB_SCHEMA_TAR
    /bin/cp -f $WEB_DB_SCHEMA_SRC $WEB_DB_SCHEMA_TAR
    /bin/cp -f $INITSCRIPT $SETUP_TAR
    check_mysql_source
    if ! [ $? -eq 0 ]; then
        echo -ne "\nWARNING: Mysql DB utilities not found, just skip over!\nPreparing workspace...   "
        MYSQL_TAR=
    else
        /bin/cp -fr $MYSQL_SRC/* $MYSQL_TAR
    fi
    check_zk_source
    if ! [ $? -eq 0 ]; then
        echo -ne "\nWARNING: Zookeeper not found, just skip over!\nPreparing workspace...   "
        ZK_TAR=
    else
        /bin/cp -fr $ZK_SRC/* $ZK_TAR
    fi
    echo "Done."
}

compile_code_tree() {
    if ! [ -e $SRC_BASE/wm-infosys-api ]; then
        echo "Source tree of wm-infosys-api not found!"
        exit 1
    fi
    if ! [ -e $SRC_BASE/wm-infosys-medicalservice ]; then
        echo "Source tree of wm-infosys-medicalservice not found!"
	exit 1
    fi
    if ! [ -e $SRC_BASE/wm-infosys-diseaseservice ]; then
        echo "Source tree of wm-infosys-diseaseservice not found!"
        exit 1
    fi
    if ! [ -e $SRC_BASE/wm-infosys-crawler ]; then
        echo "Source tree of wm-infosys-crawler not found!"
        exit 1
    fi
    if ! [ -e $SRC_BASE/wm-infosys-web ]; then
        echo "Source tree of wm-infosys-crawler not found!"
        exit 1
    fi

    if ! [ "z$MAVEN_HOME" == "z" ]; then
        MVN=${MAVEN_HOME}
    elif [ -f /usr/bin/mvn ]; then
        MVN=/usr/bin/mvn
    else
        echo "Maven home not found,please install it first!"
        exit 2
    fi
    
    cd $SRC_BASE/wm-infosys-api
    $MVN install
    cd $SRC_BASE/wm-infosys-medicalservice
    $MVN package
    cd $SRC_BASE/wm-infosys-diseaseservice
    $MVN package
    cd $SRC_BASE/wm-infosys-crawler
    $MVN package
    cd $SRC_BASE/wm-infosys-web
    $MVN package
    cd $PWD
    return 0
}

check_packages() {
    if ! [ -e $MS_LIB_SRC ] || [ $(ls $MS_LIB_SRC/*.jar|wc -w) -eq 0 ]; then
        echo "Some errors have been found in wm-infosys-medicalservice, EXIT 3!"
        exit 3
    fi
    if ! [ -e $DS_LIB_SRC ] || [ $(ls $DS_LIB_SRC/*.jar|wc -w) -eq 0  ]; then
        echo "Some errors have been found in wm-infosys-diseaseservice, EXIT 3!"
        exit 3
    fi
    if ! [ -e $CR_LIB_SRC ] || [ $(ls $CR_LIB_SRC/*.jar|wc -w) -eq 0  ]; then
        echo "Some errors have been found in wm-infosys-crawler, EXIT 3!"
        exit 3
    fi
    if ! [ -e $WEB_LIB_SRC ] || [ $(ls $WEB_LIB_SRC/*.jar|wc -w) -eq 0  ]; then
        echo "Some errors have been found in wm-infosys-web, EXIT 3!"
        exit 3
    fi
    return 0
}

gen_target() {
    tarball=$TMP_DIR/$1.tar.gz
    tarfile=$TARGET/$1.run
    echo -n "Generating offline package...   "
    cd $TMP_DIR
    if [ -e ./zk ]; then
        opt_zk="zk"
    fi
    if [ -e ./db ]; then
        opt_db="db"
    fi
    tar -cvzf $tarball bin lib conf setup $opt_zk $opt_db
    if [ -f $tarball ]; then
        /bin/cp -f $SELFEXTRACT $tarfile
        cat $tarball>>$tarfile
        echo -ne "Done.\nClean up temporary files...   "
        rm -fr $TMP_DIR
        echo "Done."
        echo -ne "======BUILD SUCCESS======\nTarget: "
        echo $(ls $tarfile)
        exit 0
    else
        echo "Error."
        exit -1
    fi
}

until [ $# -eq 0 ]
do
    case $1 in
    -h|--help)
        echo "Usage: ./build_offline_pack.sh [-h | --help] [-s | --skip-compile-src] [-v <version>]"
        echo -e "\n\t-h --help\t\t Show this help."
        echo -e "\t-s --skip-compile-src\t Skip over the step of compiling the source code tree."
        echo -e "\t-v <version>\t\t To specify a version number of the target binary package.\n"
        exit 0
        ;;
    -v) BUILD_VERSION=$2
        if [ "z$2" == "z" ]; then
            echo "Error: version number needed. See --help"
            exit 1
        fi
        shift 2
        ;;
    -s|--skip-compile-src)
        SKIP_COMPILE_FLAG=1
        shift
        ;;
    *) shift
        ;;
    esac     
done

if [ "z$SKIP_COMPILE_FLAG" == "z" ]; then
    compile_code_tree
fi
check_packages
check_config_files
copy_to_workspace
make_version
analysis_lib_files $MS_LIB_SRC $SETUP_TAR/ms_lib_files
analysis_lib_files $DS_LIB_SRC $SETUP_TAR/ds_lib_files
analysis_lib_files $CR_LIB_SRC $SETUP_TAR/cs_lib_files
analysis_lib_files $WEB_LIB_SRC $SETUP_TAR/web_lib_files
gen_target $OFFLINE_PACK_PREFIX
