package com.isoft.wm.infosys.service;

import com.isoft.wm.infosys.entity.DepartmentVo;
import com.isoft.wm.infosys.entity.DocLevelNumVo;
import com.isoft.wm.infosys.entity.HospitalVo;
import com.isoft.wm.infosys.resp.HospitalInfoResp;
import com.isoft.wm.infosys.viewmodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HospitalRationalAnalysisServiceImpl implements HospitalRationalAnalysisService {
    @Autowired
    HospitalService hospitalService;

    /* (non-Javadoc)
     * @see org.isoft.wm.infosys.service.HospitalRationalAnalysisService#listHospitalByName(java.lang.String, org.springframework.data.domain.Pageable)
     */
    @Override
    public HospitalInfoResp listHospitalByName(String hospitalName, Pageable pageable) {
        if (hospitalName != null && !"".equals(hospitalName)) {
            return new HospitalInfoResp(hospitalService.getHospitalNumberByNameLike(hospitalName), pageable.getPageNumber(),
                    pageable.getPageSize(), hospitalService.findHospitalByNameLike(hospitalName, pageable));
        } else {
            return new HospitalInfoResp(hospitalService.getHospitalNumber(), pageable.getPageNumber(), pageable.getPageSize(),
                    hospitalService.listAllHospitals(pageable));
        }
    }

    /* (non-Javadoc)
     * @see org.isoft.wm.infosys.service.HospitalRationalAnalysisService#hospitalStructureTree(java.lang.Long)
     */
    @Override
    public HospitalViewModel hospitalStructureTree(Long hospitalId) {
        HospitalViewModel hospVm = new HospitalViewModel(hospitalService.getHospital(hospitalId).orElseGet(() -> {
            return null;
        }));
        List<DepartmentVo> deptList = hospitalService.pullDepartmentsByHospitalId(hospVm.getId(), 0);
        hospVm.setChildren(deptList);
        if (deptList != null) {
            for (DepartmentVo dept : deptList) {
                dept.setChildren(hospitalService.subDepartmentTreeWalk(dept.getId(), 1, -1));
            }
        }
        return hospVm;
    }

    /* (non-Javadoc)
     * @see org.isoft.wm.infosys.service.HospitalRationalAnalysisService#hospitalStructureTree(java.lang.String)
     */
    @Override
    public HospitalViewModel hospitalStructureTree(String hospitalName) {
        List<HospitalVo> hospList = hospitalService.findHospitalByNameLike(hospitalName);
        if (hospList != null && hospList.size() > 0) {
            HospitalViewModel hosp = (HospitalViewModel) hospList.get(0);
            List<DepartmentVo> deptList = hospitalService.pullDepartmentsByHospitalId(hosp.getId(), 0);
            hosp.setChildren(deptList);
            if (deptList != null) {
                for (DepartmentVo dept : deptList) {
                    dept.setChildren(hospitalService.subDepartmentTreeWalk(dept.getId(), 1, -1));
                }
            }
            return hosp;
        }
        return null;
    }


//	public HospitalContrastTableViewModel getHospitalContrastTable(Long hospitalId1, Long hospitalId2) {
//		HospitalContrastTableViewModel result = new HospitalContrastTableViewModel();
//		List<DepartmentVo> interDeptsL1 = hospitalService.pullIntersectLevel1DeptOfTwoHospitals(hospitalId1, hospitalId2);
//		if (interDeptsL1 != null) {
//	
//			result.setTotal(interDeptsL1.size());
//			
//			for (DepartmentVo deptItr: interDeptsL1) {
//				Map<String, String> row = new HashMap<String, String>();
//				row.put("department", deptItr.getName());
//				
//				StringBuilder sb = new StringBuilder();
//				Set<String> deptL2H1Set = new HashSet<String>();
//				Set<String> deptL2H1Clone = new HashSet<String>();
//				List<DepartmentVo> hosp1DeptsL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId1, deptItr.getName(), null);
//				if (hosp1DeptsL2 != null) {
//					for (DepartmentVo deptL2: hosp1DeptsL2) {
//						sb.append(deptL2.getName()).append("(").append(deptL2.getDoctorNum()).append("),");
//						deptL2H1Set.add(deptL2.getName());
//					}
//					if (sb.length() > 0) {
//						sb.deleteCharAt(sb.length() - 1); //delete the last comma ","
//						deptL2H1Clone.addAll(deptL2H1Set);
//					}
//				}
//				row.put("hospitala", sb.toString());
//				
//				sb.delete(0, sb.length());
//				Set<String> deptL2H2Set = new HashSet<String>();
//				Set<String> diffSet = new HashSet<String>();
//				List<DepartmentVo> hosp2DeptsL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId2, deptItr.getName(), null);
//				if (hosp2DeptsL2 != null) {
//					for (DepartmentVo deptL2: hosp2DeptsL2) {
//						sb.append(deptL2.getName()).append("(").append(deptL2.getDoctorNum()).append("),");
//						deptL2H2Set.add(deptL2.getName());
//					}
//					if (sb.length() > 0) {
//						sb.deleteCharAt(sb.length() - 1); //delete the last comma ","
//					}
//				}
//				row.put("hospitalb", sb.toString());
//				
//				deptL2H1Set.removeAll(deptL2H2Set);
//				deptL2H2Set.removeAll(deptL2H1Clone);
//				diffSet.addAll(deptL2H1Set);
//				diffSet.addAll(deptL2H2Set);
//				
//				if (diffSet.size() > 0) {
//					sb.delete(0, sb.length());
//					sb.append("差异科室数量").append(diffSet.size()).append(",分别是：").append(diffSet.toString());
//					row.put("verdict", sb.toString());
//				}
//				result.addRow(row);
//			}
//		}
//		return result;
//	}

    @Override
    public HospitalContrastTableViewModel getHospitalContrastTable(Long hospitalId1, Long hospitalId2) {
        HospitalContrastTableViewModel result = new HospitalContrastTableViewModel();
        List<DepartmentVo> interDeptsL1 = hospitalService.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, 0);
        if (interDeptsL1 != null) {
            result.setTotal(interDeptsL1.size());
            for (DepartmentVo deptItr : interDeptsL1) {
                Map<String, String> row = new HashMap<String, String>();
                row.put("department", deptItr.getName());
                Set<DepartmentVo> deptL2H1Set = new HashSet<DepartmentVo>();
                Set<DepartmentVo> deptL2H1Clone = new HashSet<DepartmentVo>();
                List<DepartmentVo> hosp1DeptsL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId1, deptItr.getName(), null);
                deptL2H1Set.addAll(hosp1DeptsL2);
                deptL2H1Clone.addAll(hosp1DeptsL2);
                row.put("hospitala", deptL2H1Set.toString().replace("[", "").replace("]", ""));
                Set<DepartmentVo> deptL2H2Set = new HashSet<DepartmentVo>();
                Set<DepartmentVo> diffSet = new HashSet<DepartmentVo>();
                List<DepartmentVo> hosp2DeptsL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId2, deptItr.getName(), null);
                deptL2H2Set.addAll(hosp2DeptsL2);
                row.put("hospitalb", deptL2H2Set.toString().replace("[", "").replace("]", ""));
                deptL2H1Set.removeAll(deptL2H2Set);
                deptL2H2Set.removeAll(deptL2H1Clone);
                diffSet.addAll(deptL2H1Set);
                diffSet.addAll(deptL2H2Set);
                if (diffSet.size() > 0) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("差异科室数量").append(diffSet.size()).append(",分别是：").append(
                            diffSet.toString().replace("[", "").replace("]", ""));
                    row.put("verdict", sb.toString());
                }
                result.addRow(row);
            }
        }
        return result;
    }

    @Override
    public HospitalContrastListViewModel getHospitalContrastList(Long hospitalId1, Long hospitalId2) {
        Set<DepartmentVo> h1DeptsSet = new HashSet<DepartmentVo>();
        Set<DepartmentVo> h2DeptsSet = new HashSet<DepartmentVo>();
        Set<DepartmentVo> h1DeptsSetClone = new HashSet<DepartmentVo>();
        List<DepartmentVo> hosp1Depts = hospitalService.pullDepartmentsByHospitalId(hospitalId1, -1);
        h1DeptsSet.addAll(hosp1Depts);
        h1DeptsSetClone.addAll(hosp1Depts);
        List<DepartmentVo> hosp2Depts = hospitalService.pullDepartmentsByHospitalId(hospitalId2, -1);
        h2DeptsSet.addAll(hosp2Depts);
        h1DeptsSet.removeAll(h2DeptsSet);
        h2DeptsSet.removeAll(h1DeptsSetClone);
        return new HospitalContrastListViewModel(h1DeptsSet.toString(), h2DeptsSet.toString());
    }

    @Override
    public DeptLinkMapChartViewModel getDepartmentDifferenceChart(Long hospitalId1, Long hospitalId2) {
        DeptLinkMapChartViewModel deptLinkMapVM = new DeptLinkMapChartViewModel();
        Set<DepartmentVo> dL1InterSet = new HashSet<DepartmentVo>();
        Set<DepartmentVo> h2DL1Set = new HashSet<DepartmentVo>();
        List<DepartmentVo> h1DL1 = hospitalService.pullDepartmentsByHospitalId(hospitalId1, 0);
        List<DepartmentVo> h2DL1 = hospitalService.pullDepartmentsByHospitalId(hospitalId2, 0);
        dL1InterSet.addAll(h1DL1);
        h2DL1Set.addAll(h2DL1);
        dL1InterSet.retainAll(h2DL1Set);
        for (DepartmentVo dept : dL1InterSet) {
            List<DepartmentVo> h1DL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId1, dept.getName(), null);
            if (h1DL2 != null) {
                for (DepartmentVo subDept : h1DL2) {
                    deptLinkMapVM.addLink(subDept.getName(), dept.getName());
                    deptLinkMapVM.addNode(subDept.getName());
                }
            }
            List<DepartmentVo> h2DL2 = hospitalService.pullSubDepartmentsByParentName(hospitalId2, dept.getName(), null);
            if (h2DL2 != null) {
                for (DepartmentVo subDept : h2DL2) {
                    deptLinkMapVM.addLink(subDept.getName(), dept.getName());
                    deptLinkMapVM.addNode(subDept.getName());
                }
            }
            deptLinkMapVM.addNode(dept.getName());
            deptLinkMapVM.addLegend(dept.getName());
        }
        return deptLinkMapVM;
    }

    @Override
    public List<DeptL2ContrastTableViewModel> getHospitalDeptL2ContrastTable(Long hospitalId1, Long hospitalId2) {
        List<DeptL2ContrastTableViewModel> l2ContrastVMList = new ArrayList<DeptL2ContrastTableViewModel>();
        List<DepartmentVo> hDL2 = hospitalService.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, 1);
        StringBuilder sb = new StringBuilder();
        if (hDL2 != null) {
            for (DepartmentVo dept : hDL2) {
                DeptL2ContrastTableViewModel l2ContrastVM = new DeptL2ContrastTableViewModel();
                //for the first hospital
                long h1DocTotal = hospitalService.getDocNumOfDepartment(hospitalId1, dept.getName());
                l2ContrastVM.setName(dept.getName());
                if (h1DocTotal > 0) {
                    List<DocLevelNumVo> h1D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId1, dept.getName());
                    if (h1D2NumList != null) {
                        sb.delete(0, sb.length());
                        for (DocLevelNumVo h1D2Num : h1D2NumList) {
                            sb.append(String.format("%s:%.2f%%,", h1D2Num.getDoctor_position(),
                                    (h1D2Num.getCnt_person().doubleValue() / h1DocTotal) * 100));
                        }
                        if (sb.length() > 0) {
                            sb.delete(sb.length() - 1, sb.length()); //delete last comma
                        }
                        l2ContrastVM.setLeft(sb.toString());
                    }
                }
                //for the second hospital
                long h2DocTotal = hospitalService.getDocNumOfDepartment(hospitalId2, dept.getName());
                if (h2DocTotal > 0) {
                    List<DocLevelNumVo> h2D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId2, dept.getName());
                    if (h2D2NumList != null) {
                        sb.delete(0, sb.length());
                        for (DocLevelNumVo h2D2Num : h2D2NumList) {
                            sb.append(String.format("%s:%.2f%%,", h2D2Num.getDoctor_position(),
                                    (h2D2Num.getCnt_person().doubleValue() / h2DocTotal) * 100));
                        }
                        if (sb.length() > 0) {
                            sb.delete(sb.length() - 1, sb.length());//delete last comma
                        }
                        l2ContrastVM.setRight(sb.toString());
                    }
                }
                l2ContrastVMList.add(l2ContrastVM);
            }
        }
        return l2ContrastVMList;
    }

    @Override
    public DeptL2ContrastBarViewModel getHospitalDeptL2ContrastBar(Long hospitalId1, Long hospitalId2) {
        DeptL2ContrastBarViewModel result = new DeptL2ContrastBarViewModel();
        HospitalVo hosp1 = hospitalService.getHospital(hospitalId1).orElseGet(() -> {
            return null;
        });
        HospitalVo hosp2 = hospitalService.getHospital(hospitalId2).orElseGet(() -> {
            return null;
        });
        if (hosp1 == null) {
            return null;
        }
        result.putMapList(hosp1.getName(), null);

        if (hosp2 == null) {
            return null;
        }
        result.putMapList(hosp2.getName(), null);
        List<DepartmentVo> hDL2 = hospitalService.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, 1);
        if (hDL2 != null) {
            for (DepartmentVo dept : hDL2) {
                long h1DocTotal = hospitalService.getDocNumOfDepartment(hospitalId1, dept.getName());
                long h2DocTotal = hospitalService.getDocNumOfDepartment(hospitalId2, dept.getName());
                List<DocLevelNumVo> h1D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId1, dept.getName());
                List<DocLevelNumVo> h2D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId2, dept.getName());
                if (h1D2NumList != null && h2D2NumList != null) {
                    HashSet<DocLevelNumVo> interDeptSet = new HashSet<DocLevelNumVo>();
                    interDeptSet.addAll(h1D2NumList);
                    interDeptSet.retainAll(h2D2NumList);
                    for (DocLevelNumVo h1D2Num : h1D2NumList) {
                        if (interDeptSet.contains(h1D2Num) && h1DocTotal > 0) {
                            Double percnt = (h1D2Num.getCnt_person().doubleValue() / h1DocTotal) * 100;
                            result.putMapList(hosp1.getName(), percnt.longValue());
                            result.addCategoryList(h1D2Num.getDoctor_position());
                        }
                    }
                    for (DocLevelNumVo h2D2Num : h2D2NumList) {
                        if (interDeptSet.contains(h2D2Num) && h2DocTotal > 0) {
                            Double percnt = (h2D2Num.getCnt_person().doubleValue() / h2DocTotal) * 100;
                            result.putMapList(hosp2.getName(), percnt.longValue());
                        }
                    }
                }
            }
        }
        return result;
    }

    @Override
    public DeptL2ContrastPercentViewModel getHospitalDeptL2ContrastPercent(Long hospitalId1, Long hospitalId2) {
        DeptL2ContrastPercentViewModel result = new DeptL2ContrastPercentViewModel();

        List<DepartmentVo> hDL2 = hospitalService.pullIntersectDeptOfTwoHospitals(hospitalId1, hospitalId2, 1);
        if (hDL2 != null) {
            for (DepartmentVo dept : hDL2) {
                long h1DocTotal = hospitalService.getDocNumOfDepartment(hospitalId1, dept.getName());
                long h2DocTotal = hospitalService.getDocNumOfDepartment(hospitalId2, dept.getName());
                List<DocLevelNumVo> h1D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId1, dept.getName()); //待优化,直接获取专家数
                List<DocLevelNumVo> h2D2NumList = hospitalService.getDocNumOfDiffLevels(hospitalId2, dept.getName());//待优化,直接获取专家数
                if (h1D2NumList != null && h2D2NumList != null) {
                    HashSet<DocLevelNumVo> interDeptSet = new HashSet<DocLevelNumVo>();
                    interDeptSet.addAll(h1D2NumList);
                    interDeptSet.retainAll(h2D2NumList);
                    for (DocLevelNumVo interDept : interDeptSet) {
                        //待优化，优化后interDeptSet内应该全部为主任医师
                        if ("主任医师".equals(interDept.getDoctor_position().trim())) {
                            continue;
                        }
                        if (h1DocTotal > 0 && h2DocTotal > 0) {
                            DocLevelNumVo h1D2Num = h1D2NumList.get(h1D2NumList.indexOf(interDept));
                            DocLevelNumVo h2D2Num = h2D2NumList.get(h2D2NumList.indexOf(interDept));
                            Double percnt1 = (h1D2Num.getCnt_person().doubleValue() / h1DocTotal) * 100;
                            Double percnt2 = (h2D2Num.getCnt_person().doubleValue() / h2DocTotal) * 100;
                            double dv = Math.abs(percnt1 - percnt2);
                            if (dv >= 50) {
                                result.addList50(dept.getName());
                                result.addDeptList(dept.getName());
                            } else if (dv >= 20) {
                                result.addList20(dept.getName());
                                result.addDeptList(dept.getName());
                            } else if (dv >= 10) {
                                result.addList10(dept.getName());
                                result.addDeptList(dept.getName());
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}
