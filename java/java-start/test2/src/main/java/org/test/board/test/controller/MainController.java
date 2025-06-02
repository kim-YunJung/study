package org.test.board.test.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.test.board.test.domain.City;
import org.test.board.test.dto.request.CityRequest;
import org.test.board.test.service.MainService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController {

    private final MainService mainService;

    // http://localhost:8080/search?iata=ICN
    @ResponseBody
    @GetMapping("/search")
    public String searchIata(
            @RequestParam(required = false) String iata
    ) throws Exception {
        String result = "";

        if (!iata.trim().equals("")) {
            result = mainService.searchIata(iata.toUpperCase());
        }
        return result;
    }

    // http://localhost:8080
    @GetMapping("/")
    public String root(ModelMap map) throws Exception{
        List<String> iataList = mainService.getIata();
        List<String> nameList = mainService.getName();
        List<String> cityList = mainService.getCity();

        map.addAttribute("iatas", iataList);
        map.addAttribute("names", nameList);
        map.addAttribute("citys", cityList);

        return "index";
    }

    // http://localhost:8080/searchList
    // http://localhost:8080/searchList?iata=CHF&name=A-306+Airport&city=Busan
    @GetMapping("/searchList")
    public String searchList(
            CityRequest cityRequest
            , ModelMap map
    ) throws Exception{
        Map<String, String> searchKeyword = new HashMap<>();

        searchKeyword.put("iata", cityRequest.iata());
        searchKeyword.put("name", cityRequest.name());
        searchKeyword.put("city", cityRequest.city());

        List<City> cityList = mainService.searchCitys(searchKeyword);

        map.addAttribute("dataList", cityList);
        map.addAttribute("searchKeyword", searchKeyword);

        List<String> iataList = mainService.getIata();
        List<String> nameList = mainService.getName();
        List<String> citysList = mainService.getCity();

        map.addAttribute("iatas", iataList);
        map.addAttribute("names", nameList);
        map.addAttribute("citys", citysList);

        System.out.println("dataList = {" + cityList + "}");
        System.out.println("searchKeyword = {" + searchKeyword + "}");

        return "list";
    }

}
