package com.isoft.wm.infosys.dao;

import com.isoft.wm.infosys.entity.WebsiteSampleStatusVo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WebsiteSampleStatusDao extends PagingAndSortingRepository<WebsiteSampleStatusVo, Long> {
    @Query(value = "select new com.isoft.wm.infosys.entity.WebsiteSampleStatusVo(tc.webName, wss.status, wss.createdAt, wss.updatedAt) from WebsiteSampleStatusVo wss, TemplateConfigVo tc"
            + " where wss.templateId = tc.id and tc.webName = :webName group by wss.templateId order by wss.updatedAt desc")
    List<WebsiteSampleStatusVo> getWebsiteSampleStatus(@Param("webName") String webName);

    @Query(value = "select new com.isoft.wm.infosys.entity.WebsiteSampleStatusVo(tc.webName, wss.status, wss.createdAt, wss.updatedAt) from WebsiteSampleStatusVo wss, TemplateConfigVo tc"
            + " where wss.templateId = tc.id group by wss.templateId order by wss.updatedAt desc")
    List<WebsiteSampleStatusVo> listWebsiteSampleStatus(Pageable page);

}
