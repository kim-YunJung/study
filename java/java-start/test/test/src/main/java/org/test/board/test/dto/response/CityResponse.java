package org.test.board.test.dto.response;

import org.test.board.test.dto.CityDto;

import java.io.Serializable;
import java.util.List;

public record CityResponse(
        String icao,
        String iata,
        String name,
        String city,
        String state,
        String country,
        String elevation,
        String lat,
        String lon,
        String tz
) implements Serializable {

    public static CityResponse of(String icao, String iata, String name, String city, String state, String country, String elevation, String lat, String lon, String tz) {
        return new CityResponse(icao, iata, name, city, state, country, elevation, lat, lon, tz);
    }

    public static CityResponse from(CityDto dto) {
        return new CityResponse(dto.icao(), dto.iata(), dto.name(), dto.city()
        , dto.state(), dto.country(), dto.elevation(), dto.lat(), dto.lon(), dto.tz());
    }
}
