package com.isoft.wm.infosys.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestController {
    @RequestMapping("/")
    public String sayHello() {
        return "<html><body><h1>欢迎访问智慧医疗大数据信息平台!</h1><p>请<a href=/wm/index.html>点击此处</a>进入。</body></html>";
    }

//	@RequestMapping("/wm/html/returnContrastPage.html")
//	public void foo(HttpServletResponse  resp) throws IOException {
//		//return "redirect:/wm/html/returnContrastPage.jsp";
//		//return "redirect:/";
//		resp.sendRedirect("returnContrastP.jsp");
//	}
}
