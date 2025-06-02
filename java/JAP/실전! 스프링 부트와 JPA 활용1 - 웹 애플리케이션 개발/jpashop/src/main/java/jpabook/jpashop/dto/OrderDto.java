package jpabook.jpashop.dto;

import jpabook.jpashop.domain.*;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(
        Long id
        , MemberDto memberDto
        , List<OrderItemsDto> orderItemsDto
        , DeliveryDto deliveryDto
        , OrderStatus status
        , LocalDateTime orderDate
        , LocalDateTime createdAt
        , String createdBy
        , LocalDateTime modifiedAt
        , String modifiedBy
) {
    public static OrderDto of(Long id, MemberDto memberDto, List<OrderItemsDto> orderItemsDto, DeliveryDto deliveryDto, OrderStatus status, LocalDateTime orderDate, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new OrderDto(id, memberDto, orderItemsDto, deliveryDto, status, orderDate, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static OrderDto from(Order entity){
        return new OrderDto(
                entity.getId()
                , MemberDto.from(entity.getMember())
                , entity.getOrderItems().stream()
                    .map(OrderItemsDto::from)
                    .toList()
                , DeliveryDto.from(entity.getDelivery())
                , entity.getStatus()
                , entity.getOrderDate()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    }
}
