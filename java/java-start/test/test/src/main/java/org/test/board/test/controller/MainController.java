package org.test.board.test.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.test.board.test.dto.request.CityRequest;
import org.test.board.test.dto.response.CityResponse;
import org.test.board.test.service.MainService;
import org.test.board.test.service.PaginationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class MainController {

    private final MainService mainService;
    private final PaginationService paginationService;

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
    @GetMapping("/searchList")
    public String searchList(
            CityRequest cityRequest
            , @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
            , ModelMap map
    ) {
        log.info("iata={}, name = {}, city = {}", cityRequest.iata(), cityRequest.name(), cityRequest.city());

        Map<String, String> searchKeyword = new HashMap<>();

        searchKeyword.put("iata", cityRequest.iata());
        searchKeyword.put("name", cityRequest.name());
        searchKeyword.put("city", cityRequest.city());

        Page<CityResponse> cityList = mainService.searchCitys(searchKeyword, pageable)
                .map(CityResponse::from);

        List<Integer> barNumbers = paginationService.getPaginationBarNumbers(pageable.getPageNumber(), cityList.getTotalPages());

        map.addAttribute("dataList", cityList);
        map.addAttribute("searchKeyword", searchKeyword);

        return "index";
    }

}
