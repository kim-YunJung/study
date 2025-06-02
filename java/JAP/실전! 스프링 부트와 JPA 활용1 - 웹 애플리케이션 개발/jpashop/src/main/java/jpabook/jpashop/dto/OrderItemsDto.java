package jpabook.jpashop.dto;

import jpabook.jpashop.domain.OrderItem;

import java.time.LocalDateTime;

public record OrderItemsDto(
        Long id
        , ItemDto itemDto
        , OrderDto orderDto
        , int orderPrice
        , int count
        , LocalDateTime createdAt
        , String createdBy
        , LocalDateTime modifiedAt
        , String modifiedBy
) {
    public static OrderItemsDto of(Long id, ItemDto itemDto, OrderDto orderDto, int orderPrice, int count, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new OrderItemsDto(id, itemDto, orderDto, orderPrice, count, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static OrderItemsDto from(OrderItem entity){
        return new OrderItemsDto(
                entity.getId()
                , ItemDto.from(entity.getItem())
                , OrderDto.from(entity.getOrder())
                , entity.getOrderPrice()
                , entity.getCount()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    };
}
