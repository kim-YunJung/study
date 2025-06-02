package org.test.board.test.dto;

import org.test.board.test.domain.City;

public record CityDto(
        String icao
        , String iata
        , String name
        , String city
        , String state
        , String country
        , String elevation
        , String lat
        , String lon
        , String tz
) {
    public static CityDto of(String iata, String name, String city) {
        return new CityDto(null, iata, name, city, null
                , null, null, null, null
        , null);
    }

    public static CityDto of(String icao, String iata, String name, String city, String state
            , String country, String elevation, String lat, String lon, String tz) {
        return new CityDto(icao, iata, name, city, state, country, elevation, lat, lon, tz);
    }

    public static CityDto from(City entity) {
        return new CityDto(
                entity.getIcao(), entity.getIata(), entity.getName(), entity.getCity()
                , entity.getState(), entity.getCountry(), entity.getElevation()
                , entity.getLat(), entity.getLon(), entity.getTz()
        );
    }

    public City toEntity(){
        return City.of(
            iata
            , name
            , city
        );
    }
}
