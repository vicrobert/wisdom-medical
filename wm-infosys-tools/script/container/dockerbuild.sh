#!/bin/bash
#################################################################
# Build all dockers of each service
# This package is suitable for deploying & running Wisdom Medical
# Information Platform inside the container environment
# Author: Junbo.Yang
# mailto: junbo.yang@i-soft.com.cn
#
# howto:
# You can import these images into docker-registry after this
# building process
# eg:
# run internet-medical-service as:
# docker run -d -eZK_HOST=192.168.33.230 \
# -eMYSQL_HOST=192.168.33.251 -eMYSQL_USER=wmims \
# -eMYSQL_PASS=wmims wm-infosys-internetmedical
# run disease-service as:
# docker run -d -eZK_HOST=192.168.33.230 \
# -eMYSQL_HOST=192.168.33.251 -eMYSQL_USER=wmds \
# -eMYSQL_PASS=wmds wm-infosys-disease
# run web-service as:
# docker run -d -p 8082:8080 -eZK_HOST=192.168.33.230 \
# -eMYSQL_HOST=192.168.33.251 -eMYSQL_USER=wmweb \
# -eMYSQL_PASS=wmweb wm-infosys-web
# run webcrawler-service as:
# docker run -d -p 8081:8081 -eZK_HOST=192.168.33.230 \
# -eHOST=192.168.33.57 -eMYSQL_HOST=192.168.33.251 \
# -eMYSQL_USER=wmwebcrawler -eMYSQL_PASS=wmwebcrawler \
# wm-infosys-webcrawler
#################################################################
CUR_DIR=`pwd`
SRC_BASE="$CUR_DIR/../../.."
MS_LIB_SRC="$SRC_BASE/wm-infosys-medicalservice/target/lib"
DS_LIB_SRC="$SRC_BASE/wm-infosys-diseaseservice/target/lib"
CR_LIB_SRC="$SRC_BASE/wm-infosys-crawler/target"
WEB_LIB_SRC="$SRC_BASE/wm-infosys-web/target"
MS_CONF_SRC="$SRC_BASE/wm-infosys-medicalservice/conf"
DS_CONF_SRC="$SRC_BASE/wm-infosys-diseaseservice/conf"
CR_CONF_SRC="$SRC_BASE/wm-infosys-crawler/conf"
WEB_CONF_SRC="$SRC_BASE/wm-infosys-web/conf"
MS_LIB_TAR="dockerfiles/wm-infosys-medicalservice/lib"
DS_LIB_TAR="dockerfiles/wm-infosys-diseaseservice/lib"
CR_LIB_TAR="dockerfiles/wm-infosys-crawler/lib"
WEB_LIB_TAR="dockerfiles/wm-infosys-web/lib"
MS_CONF_TAR="dockerfiles/wm-infosys-medicalservice/conf"
DS_CONF_TAR="dockerfiles/wm-infosys-diseaseservice/conf"
CR_CONF_TAR="dockerfiles/wm-infosys-crawler/conf"
WEB_CONF_TAR="dockerfiles/wm-infosys-web/conf"

check_docker_env() {
    dv=$(docker -v | awk {'print $3'})
    [ "z$dv" == "z" ] && return 1
    return 0
}

make_crawler_image() {
    cd $CUR_DIR
    mkdir -p $CR_CONF_TAR $CR_LIB_TAR
    /bin/cp -f $CR_CONF_SRC/*.sample $CR_CONF_TAR
    /bin/cp -f $CR_LIB_SRC/*.jar $CR_LIB_TAR
    cd dockerfiles/wm-infosys-crawler && docker build -t wm-infosys-webcrawler . -f webcrawler-service.dockerfile
    echo "wm-infosys-webcrawler done."
}

make_diseaseservice_image() {
    cd $CUR_DIR
    mkdir -p $DS_CONF_TAR $DS_LIB_TAR
    /bin/cp -f $DS_CONF_SRC/*.sample $DS_CONF_TAR
    /bin/cp -f $DS_LIB_SRC/*.jar $DS_LIB_TAR
    cd dockerfiles/wm-infosys-diseaseservice && docker build -t wm-infosys-disease . -f disease-service.dockerfile
    echo "wm-infosys-disease done."
}

make_medicalservice_image() {
    cd $CUR_DIR
    mkdir -p $MS_CONF_TAR $MS_LIB_TAR
    /bin/cp -f $MS_CONF_SRC/*.sample $MS_CONF_TAR
    /bin/cp -f $MS_LIB_SRC/*.jar $MS_LIB_TAR
    cd dockerfiles/wm-infosys-medicalservice && docker build -t wm-infosys-internetmedical . -f internet-medical-service.dockerfile
    echo "wm-infosys-internetmedical done."
}

make_web_image() {
    cd $CUR_DIR
    mkdir -p $WEB_CONF_TAR $WEB_LIB_TAR
    /bin/cp -f $WEB_CONF_SRC/*.sample $WEB_CONF_TAR
    /bin/cp -f $WEB_LIB_SRC/*.jar $WEB_LIB_TAR
    cd dockerfiles/wm-infosys-web && docker build -t wm-infosys-web . -f web-service.dockerfile
    echo "wm-infosys-web done."
}

#make all
make_docker_images() {
    make_medicalservice_image
    make_diseaseservice_image
    make_crawler_image
    make_web_image
    echo "All images complete."
}

export_images() {
    echo "TODO:??"
}

check_docker_env
! [ $? -eq 0 ] && exit 1
APPNAME=$0
PROCESS_DONE=1
EXPO=1

until [ $# -eq 0 ]
do
    case $1 in
    -h|--help)
        [ $PROCESS_DONE -eq 0 ] && exit 0
        echo "Usage: $APPNAME [--make-medicalservice-image] [--make-diseaseservice-image] [--make-crawler-image]"
        echo -e "\t[--make-web-image] [--export-images] [-v | --version] [-h | --help]"
        echo -e "\n\t-h --help\t\t\t Show this help."
        echo -e "\t-v --version\t\t\t Show this version."
        echo -e "\t--make-medicalservice-image\t Only make medical service image."
        echo -e "\t--make-diseaseservice-image\t Only make disease service image."
        echo -e "\t--make-crawler-image\t\t Only make webcrawler service image."
        echo -e "\t--make-web-image\t\t Only make web service image."
        echo -e "\t--export-images\t\t\t Export all image tarballs after building.\n"
        exit 0
        ;;
    -v|--version)
        [ $PROCESS_DONE -eq 0 ] && exit 0
        echo "Version: 1.0.0"
        exit 0
        ;;
    --make-medicalservice-image)
        make_medicalservice_image
        PROCESS_DONE=0
        shift
        ;;
    --make-diseaseservice-image)
        make_diseaseservice_image
        PROCESS_DONE=0
        shift
        ;;
    --make-crawler-image)
        make_crawler_image
        PROCESS_DONE=0
        shift
        ;;
    --make-web-image)
        make_web_image
        PROCESS_DONE=0
        shift
        ;;
    --export-images)
        EXPO=0
        shift
        ;;
    *) shift
        ;;
    esac
done

[ $PROCESS_DONE -eq 1 ] && make_docker_images && PROCESS_DONE=0
[ $PROCESS_DONE -eq 0 ] && [ $EXPO -eq 0 ] && export_images

