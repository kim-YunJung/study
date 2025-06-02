package org.test.board.test.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.test.board.test.dto.CityDto;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class MainService {

    String fileAddress = System.getProperty("user.dir") + "/src/main/java/org/test/board/test/json/data.json";

    public String searchIata(String iata) throws Exception {
        String result = "";
        List<JsonNode> cityList = new ArrayList<>();

        String jsonFile = fileAddress;

        // ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JSON 파일을 Java 객체로 읽기
        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (nodeList.get("iata").textValue().equals(iata)){
                    cityList.add(nodeList);
                }
            }
        }

        return result = cityList.toString();
    }

    public List<String> getIata() throws Exception {
        List<String> cityList = new ArrayList<>();

        String jsonFile = fileAddress;

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (!nodeList.get("iata").textValue().equals("")){
                    cityList.add(nodeList.get("iata").textValue());
                }
            }
        }

        Set<String> citySet = new HashSet<>(cityList);
        List<String> resultList = cityList.stream().sorted(String::compareTo).collect(Collectors.toList());

        return resultList;
    }

    public List<String> getName() throws Exception {
        List<String> cityList = new ArrayList<>();

        String jsonFile = fileAddress;

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (!nodeList.get("name").textValue().equals("")){
                    cityList.add(nodeList.get("name").textValue());
                }
            }
        }

        Set<String> citySet = new HashSet<>(cityList);
        List<String> resultList = cityList.stream().sorted(String::compareTo).collect(Collectors.toList());

        return resultList;
    }

    public List<String> getCity() throws Exception {
        List<String> cityList = new ArrayList<>();

        String jsonFile = fileAddress;

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (!nodeList.get("city").textValue().equals("")){
                    cityList.add(nodeList.get("city").textValue());
                }
            }
        }

        Set<String> citySet = new HashSet<>(cityList);
        List<String> resultList = cityList.stream().sorted(String::compareTo).collect(Collectors.toList());

        return resultList;
    }

    public Page<CityDto> searchCitys(Map<String, String> searchKeyword, Pageable pageable) {
        List<String> cityList = new ArrayList<>();

        /*
        searchKeyword.forEach((key, value) -> {
            switch (key){
                case "iata" -> {
                    if (!value.trim().equals(""))
                        cityList.add(value);
                }
                case "name" -> {
                    if (!value.trim().equals(""))
                        cityList.add(value);
                }
                case "city" -> {
                    if (!value.trim().equals(""))
                        cityList.add(value);
                }
            }
        });
        */

        //System.out.println("size >>> "+cityList.size());

        return null;
        //return CityResponse.findByTitleContaining(searchKeyword.get).map(CityDto::from);
    }
}
