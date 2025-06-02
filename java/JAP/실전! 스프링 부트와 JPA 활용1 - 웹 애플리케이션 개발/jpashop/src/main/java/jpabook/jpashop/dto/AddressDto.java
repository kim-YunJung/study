package jpabook.jpashop.dto;

import jpabook.jpashop.domain.Address;

public record AddressDto(
        String city
        , String street
        , String zipcode
) {
    public static AddressDto of(String city, String street, String zipcode) {
        return new AddressDto(city, street, zipcode);
    }

    public static AddressDto from(Address entity) {
        return new AddressDto(
                entity.getCity()
                , entity.getStreet()
                , entity.getZipcode()
        );
    }
}
