package jpabook.jpashop.dto;

import jpabook.jpashop.domain.Delivery;
import jpabook.jpashop.domain.DeliveryStatus;
import jpabook.jpashop.domain.Order;

import java.time.LocalDateTime;

public record DeliveryDto(
        Long id
        , OrderDto orderDto
        , AddressDto addressDto
        , DeliveryStatus status
        , LocalDateTime createdAt
        , String createdBy
        , LocalDateTime modifiedAt
        , String modifiedBy
) {

    public static DeliveryDto of(Long id, OrderDto orderDto, AddressDto addressDto, DeliveryStatus status, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new DeliveryDto(id, orderDto, addressDto, status, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static DeliveryDto from(Delivery entity){
        return new DeliveryDto(
                entity.getId()
                , OrderDto.from(entity.getOrder())
                , AddressDto.from(entity.getAddress())
                , entity.getStatus()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    }

}
