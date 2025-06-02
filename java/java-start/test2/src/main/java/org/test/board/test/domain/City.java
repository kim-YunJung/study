package org.test.board.test.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class City {
    private String icao;

    private String iata;

    private String name;

    private String city;

    private String state;

    private String country;

    private String elevation;

    private String lat;

    private String lon;

    private String tz;

    protected City() {
    }

    protected City(String iata, String name, String city) {
        this.iata = iata;
        this.name = name;
        this.city = city;
    }

    protected City(String icao, String iata, String name, String city, String state, String country, String elevation, String lat, String lon, String tz) {
        this.icao = icao;
        this.iata = iata;
        this.name = name;
        this.city = city;
        this.state = state;
        this.country = country;
        this.elevation = elevation;
        this.lat = lat;
        this.lon = lon;
        this.tz = tz;
    }

    public static City of(){
        return new City();
    }

    public static City of(String iata, String name, String city) {
        return new City(iata, name, city);
    }
    public static City of(String icao, String iata, String name, String city, String state
            , String country, String elevation, String lat, String lon, String tz) {
        return new City(icao, iata, name, city, state, country, elevation, lat, lon, tz);
    }

    @Override
    public String toString() {
        return "{" +
                "icao='" + icao + '\'' +
                ", iata='" + iata + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", elevation='" + elevation + '\'' +
                ", lat='" + lat + '\'' +
                ", lon='" + lon + '\'' +
                ", tz='" + tz + '\'' +
                '}';
    }
}
