package com.isoft.wm.infosys.viewmodel;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class DeptLinkMapChartViewModel {
	private Set<String> nodeSet = new HashSet<String>();
	private Set<String> legendSet = new HashSet<String>();
	private Map<String, String> linkMap = new HashMap<String, String>();
	public Set<String> getNodeSet() {
		return nodeSet;
	}
	public void setNodeSet(Set<String> nodeSet) {
		this.nodeSet = nodeSet;
	}
	public Set<String> getLegendSet() {
		return legendSet;
	}
	public void setLegendSet(Set<String> legendSet) {
		this.legendSet = legendSet;
	}
	public Map<String, String> getLinkMap() {
		return linkMap;
	}
	public void setLinkMap(Map<String, String> linkMap) {
		this.linkMap = linkMap;
	}
	
	public void addNode(String nodeName) {
		nodeSet.add(nodeName);
	}
	
	public void addLegend(String legName) {
		legendSet.add(legName);
	}
	
	public void addLink(String key, String value) {
		linkMap.put(key, value);
	}
	
}
