package com.isoft.wm.infosys.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.isoft.wm.infosys.dao.DoctorRtDao;
import com.isoft.wm.infosys.dao.DoctorSampleStatisticDao;
import com.isoft.wm.infosys.dao.DrugInfoRtDao;
import com.isoft.wm.infosys.dao.DrugSampleStatisticDao;
import com.isoft.wm.infosys.dao.InteractInfoRtDao;
import com.isoft.wm.infosys.dao.InteractInfoSampleStatisticDao;
import com.isoft.wm.infosys.dao.SampleStrengthDao;
import com.isoft.wm.infosys.dto.CrawlerSampleNumTendencyDto;
import com.isoft.wm.infosys.dto.DoctorRtDto;
import com.isoft.wm.infosys.dto.DrugInfoRtDto;
import com.isoft.wm.infosys.dto.InteractInfoRtDto;
import com.isoft.wm.infosys.dto.SampleNumDto;
import com.isoft.wm.infosys.dto.SampleStrengthDto;
import com.isoft.wm.infosys.entity.DoctorRtVo;
import com.isoft.wm.infosys.entity.DoctorSampleStatisticVo;
import com.isoft.wm.infosys.entity.DrugInfoRtVo;
import com.isoft.wm.infosys.entity.DrugSampleStatisticVo;
import com.isoft.wm.infosys.entity.InteractInfoRtVo;
import com.isoft.wm.infosys.entity.InteractInfoSampleStatisticVo;
import com.isoft.wm.infosys.entity.SampleStrengthVo;

@Service
public class CrawlerSamplingServiceImpl implements CrawlerSamplingService {
	@Autowired
	DoctorRtDao doctorRtDao;
	
	@Autowired
	DrugInfoRtDao drugInfoRtDao;
	
	@Autowired
	InteractInfoRtDao interactInfoRtDao;
	
	@Autowired
	DoctorSampleStatisticDao doctorSampleStatisticDao;
	
	@Autowired
	DrugSampleStatisticDao drugSampleStatisticDao;
	
	@Autowired
	InteractInfoSampleStatisticDao interactInfoSampleStatisticDao;
	
	@Autowired
	SampleStrengthDao sampleStrengthDao;
	
	@Override
	public DoctorRtDto listDoctorsRt(Pageable page) {
		DoctorRtDto doctorRtDto = new DoctorRtDto(page.getPageNumber(), page.getPageSize());
		List<DoctorRtVo> doctorRtList = doctorRtDao.ListAll(page);
		if (doctorRtList != null && doctorRtList.size() > 0) {
			doctorRtDto.setRows(doctorRtList);;
		}
		return doctorRtDto;
	}

	@Override
	public DrugInfoRtDto listDrugInfoRt(Pageable page) {
		DrugInfoRtDto drugInfoRtDto = new DrugInfoRtDto(page.getPageNumber(), page.getPageSize());
		List<DrugInfoRtVo> drugInfoRtList = drugInfoRtDao.ListAll(page);
		if (drugInfoRtList != null && drugInfoRtList.size() > 0) {
			drugInfoRtDto.setRows(drugInfoRtList);;
		}
		return drugInfoRtDto;
	}

	@Override
	public InteractInfoRtDto listInteractRt(Pageable page) {
		InteractInfoRtDto interactInfoRtDto = new InteractInfoRtDto(page.getPageNumber(), page.getPageSize());
		List<InteractInfoRtVo> interactInfoRtList = interactInfoRtDao.ListAll(page);
		if (interactInfoRtList != null && interactInfoRtList.size() > 0) {
			interactInfoRtDto.setRows(interactInfoRtList);;
		}
		return interactInfoRtDto;
	}

	@Override
	public CrawlerSampleNumTendencyDto getSampleTendencyGroupByMin() {
		CrawlerSampleNumTendencyDto crawlerSampleNumTendencyDto = new CrawlerSampleNumTendencyDto();
		Long timeStamp = System.currentTimeMillis();
		List<DoctorSampleStatisticVo> docSampStatisticList = doctorSampleStatisticDao.listSampleNumOfOneMinTop10(timeStamp);
		List<DrugSampleStatisticVo> drugSampStatisticList = drugSampleStatisticDao.listSampleNumOfOneMinTop10(timeStamp);
		List<InteractInfoSampleStatisticVo> interactSampStatisticList = interactInfoSampleStatisticDao.listSampleNumOfOneMinTop10(timeStamp);
		
		String time;
		int c1 = 0, c2 = 0, c3 = 0;
		timeStamp -= 540000L;
		Calendar calendar = Calendar.getInstance();
		for (int i = 0; i < 10; i ++) {
			calendar.setTimeInMillis(timeStamp);
			time = calendar.get(Calendar.HOUR) + ":" + calendar.get(Calendar.MINUTE);
			crawlerSampleNumTendencyDto.getData().addXaxis(time);
			
			Map<String, Object> docNum = new HashMap<String, Object>();
			docNum.put("name", time);
			docNum.put("cate", "医生采集数");
			if (docSampStatisticList != null && c1 < docSampStatisticList.size()) {
				DoctorSampleStatisticVo ds = docSampStatisticList.get(c1);
				if (timeStamp.equals(ds.getTimeStamp())) {
					docNum.put("value", ds.getSampleNum());
					c1 ++;
				} else {
					docNum.put("value", 0L);
				}	
			} else {
				docNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addDocnum(docNum);
			
			Map<String, Object> medicalNum = new HashMap<String, Object>();
			medicalNum.put("name", time);
			medicalNum.put("cate", "药品采集数");
			if (drugSampStatisticList != null && c2 < drugSampStatisticList.size()) {
				DrugSampleStatisticVo drugss = drugSampStatisticList.get(c2);
				if (timeStamp.equals(drugss.getTimeStamp())) {
					medicalNum.put("value", drugss.getSampleNum());
					c2 ++;
				} else {
					medicalNum.put("value", 0L);
				}
			} else {
				medicalNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addMedicalnum(medicalNum);
			
			Map<String, Object> interactNum = new HashMap<String, Object>();
			interactNum.put("name", time);
			interactNum.put("cate", "互动采集数");
			if (interactSampStatisticList != null && c3 < interactSampStatisticList.size()) {
				InteractInfoSampleStatisticVo iis = interactSampStatisticList.get(c3);
				if (timeStamp.equals(iis.getTimeStamp())) {
					interactNum.put("value", iis.getSampleNum());
					c3 ++;
				} else {
					interactNum.put("value", 0L);
				}
			} else {
				interactNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addInteractnum(interactNum);
			
			timeStamp += 60000L;
		}
		
		return crawlerSampleNumTendencyDto;
	}

	@Override
	public CrawlerSampleNumTendencyDto getSampleTendencyGroupByDay() {
		CrawlerSampleNumTendencyDto crawlerSampleNumTendencyDto = new CrawlerSampleNumTendencyDto();
		Long timeStamp = System.currentTimeMillis();
		List<DoctorSampleStatisticVo> docSampStatisticList = doctorSampleStatisticDao.listSampleNumOfOneDayTop10(timeStamp);
		List<DrugSampleStatisticVo> drugSampStatisticList = drugSampleStatisticDao.listSampleNumOfOneDayTop10(timeStamp);
		List<InteractInfoSampleStatisticVo> interactSampStatisticList = interactInfoSampleStatisticDao.listSampleNumOfOneDayTop10(timeStamp);
		
		String date;
		int c1 = 0, c2 = 0, c3 = 0;
		timeStamp -= 777600000L;
		Calendar calendar = Calendar.getInstance();
		for (int i = 0; i < 10; i ++) {
			calendar.setTimeInMillis(timeStamp);
			date = calendar.get(Calendar.MONTH) + "-" + calendar.get(Calendar.DATE);
			crawlerSampleNumTendencyDto.getData().addXaxis(date);
			Map<String, Object> docNum = new HashMap<String, Object>();
			docNum.put("name", date);
			docNum.put("cate", "医生采集数");
			if (docSampStatisticList != null && c1 < docSampStatisticList.size()) {
				DoctorSampleStatisticVo ds = docSampStatisticList.get(c1);
				if (timeStamp.equals(ds.getTimeStamp())) {
					docNum.put("value", ds.getSampleNum());
					c1 ++;
				} else {
					docNum.put("value", 0L);
				}
			} else {
				docNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addDocnum(docNum);
			
			Map<String, Object> medicalNum = new HashMap<String, Object>();
			medicalNum.put("name", date);
			medicalNum.put("cate", "药品采集数");
			if (drugSampStatisticList != null && c2 < drugSampStatisticList.size()) {
				DrugSampleStatisticVo drugss = drugSampStatisticList.get(c2);
				if (timeStamp.equals(drugss.getTimeStamp())) {
					medicalNum.put("value", drugss.getSampleNum());
					c2 ++;
				} else {
					medicalNum.put("value", 0L);
				}
			} else {
				medicalNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addMedicalnum(medicalNum);
			
			Map<String, Object> interactNum = new HashMap<String, Object>();
			interactNum.put("name", date);
			interactNum.put("cate", "互动采集数");
			if (interactSampStatisticList != null && c3 < interactSampStatisticList.size()) {
				InteractInfoSampleStatisticVo iis = interactSampStatisticList.get(c3);
				if (timeStamp.equals(iis.getTimeStamp())) {
					interactNum.put("value", iis.getSampleNum());
					c3 ++;
				} else {
					interactNum.put("value", 0L);
				}
			} else {
				interactNum.put("value", 0L);
			}
			crawlerSampleNumTendencyDto.getData().addInteractnum(interactNum);
			
			timeStamp += 86400000L;
		}
		
		return crawlerSampleNumTendencyDto;
	}

	@Override
	public SampleStrengthDto getSampleStrength() {
		SampleStrengthDto sampleStrengthDto = new SampleStrengthDto();
		Pageable page = PageRequest.of(0, 1);
		List<SampleStrengthVo> ss = sampleStrengthDao.findOneOrderByTimeStamp(page);
		if (ss != null && ss.size() > 0) {
			sampleStrengthDto.setData(ss.get(0).getStrength());
		}
		return sampleStrengthDto;
	}

	@Override
	public SampleNumDto getSampleTotalNum() {
		SampleNumDto sampleNumDto = new SampleNumDto(0L, 0L);
		return sampleNumDto;
	}

}
