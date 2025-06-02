package org.test.board.test.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.test.board.test.domain.City;
import org.test.board.test.dto.CityDto;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class MainService {

    String fileAddress = System.getProperty("user.dir") + "/src/main/java/org/test/board/test/json/data.json";

    public String searchIata(String iata) throws Exception {
        String result = "";
        List<JsonNode> cityList = getSearchKeyWord("iata", iata);

        return result = cityList.toString();
    }

    public List<JsonNode> getSearchKeyWord(String keyWord, String value) throws Exception {
        List<JsonNode> cityList = new ArrayList<>();

        String jsonFile = fileAddress;

        // ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JSON 파일을 Java 객체로 읽기
        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (nodeList.get(keyWord).textValue().equals(value)){
                    cityList.add(nodeList);
                }
            }
        }

        return cityList;
    }

    /* --- */
    public List<String> getIata() throws Exception {
        List<String> cityList = getSearch("iata");

        return cityList;
    }

    public List<String> getName() throws Exception {
        List<String> cityList = getSearch("name");

        return cityList;
    }

    public List<String> getCity() throws Exception {
        List<String> cityList = getSearch("city");

        return cityList;
    }

    public List<String> getSearch(String keyWord) throws Exception {
        List<String> cityList = new ArrayList<>();
        String jsonFile = fileAddress;

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (!nodeList.get(keyWord).textValue().equals("")){
                    cityList.add(nodeList.get(keyWord).textValue());
                }
            }
        }

        Set<String> citySet = new HashSet<>(cityList);
        List<String> resultList = citySet.stream().sorted(String::compareTo).collect(Collectors.toList());

        return resultList;
    }
    /* --- */


    public List<City> searchCitys(Map<String, String> searchKeyword) throws Exception{
        List<City> addCityList = new ArrayList<>();

        searchKeyword.forEach((key, value) -> {
            switch (key){
                case "iata" -> {
                    try {
                        if(!value.trim().isEmpty())
                            addCityList.add(getSearchList(key, value));
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
                case "name" -> {
                    try {
                        if(!value.trim().isEmpty())
                            addCityList.add(getSearchList(key, value));
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
                case "city" -> {
                    try {
                        if(!value.trim().isEmpty())
                            addCityList.add(getSearchList(key, value));
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });

        List<City> sorted = addCityList.stream().sorted(Comparator.comparing(City::getIata)).collect(Collectors.toList());

        return sorted;
    }

    public City getSearchList(String key, String value) throws Exception {
        List<JsonNode> cityList = new ArrayList<>();
        City resultCity = City.of();

        if (!value.trim().equals("")) {
            try {
                resultCity = getSearchKeyWordValue(key, value);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return resultCity;
    }

    public City getSearchKeyWordValue(String keyWord, String value) throws Exception {
        List<JsonNode> cityList = new ArrayList<>();

        City resultCity = City.of();

        String jsonFile = fileAddress;

        // ObjectMapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JSON 파일을 Java 객체로 읽기
        JsonNode rootNode = objectMapper.readTree(new File(jsonFile));

        for (JsonNode node : rootNode) {
            for (JsonNode nodeList : node){
                if (nodeList.get(keyWord).textValue().equals(value)){

                    resultCity = City.of(
                            nodeList.path("icao").asText()
                            , nodeList.path("iata").asText()
                            , nodeList.path("name").asText()
                            , nodeList.path("city").asText()
                            , nodeList.path("state").asText()
                            , nodeList.path("country").asText()
                            , nodeList.path("elevation").asText()
                            , nodeList.path("lat").asText()
                            , nodeList.path("lon").asText()
                            , nodeList.path("tz").asText()
                    );

                }
            }
        }

        return resultCity;
    }
}
