package org.test.board.test.dto.request;

import org.test.board.test.dto.CityDto;

public record CityRequest(
        String iata
        , String name
        , String city
) {
    public static CityRequest of(String iata, String name, String city) {
        return new CityRequest(iata, name, city);
    }

    public CityDto toDto() {
        return CityDto.of(
                iata
                , name
                , city
        );
    }
}
