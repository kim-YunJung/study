package jpabook.jpashop.dto;

import jpabook.jpashop.domain.Category;
import jpabook.jpashop.domain.item.Item;

import java.time.LocalDateTime;
import java.util.List;

public record ItemDto(
        Long id
        , String name
        , int price
        , int stockQuantity
        , List<CategoryDto> categoryDto
        /*, String director
        , String actor
        , String author
        , String isbn
        , String artist
        , String etc*/
        , LocalDateTime createdAt
        , String createdBy
        , LocalDateTime modifiedAt
        , String modifiedBy
) {
    public static ItemDto of(Long id, String name, int price, int stockQuantity, List<CategoryDto> categoryDto, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new ItemDto(id, name, price, stockQuantity, categoryDto, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static ItemDto from(Item entity){
        return new ItemDto(
                entity.getId()
                , entity.getName()
                , entity.getPrice()
                , entity.getStockQuantity()
                , entity.getCategories().stream()
                    .map(CategoryDto::from)
                    .toList()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    }

}
