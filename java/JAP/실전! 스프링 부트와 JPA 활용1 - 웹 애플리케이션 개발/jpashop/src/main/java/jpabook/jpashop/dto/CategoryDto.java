package jpabook.jpashop.dto;

import jpabook.jpashop.domain.Category;

import java.time.LocalDateTime;
import java.util.List;

public record CategoryDto(
        Long id
        , String name
        , List<ItemDto> itemDto
        , Category parent
        , List<CategoryDto> child
        , LocalDateTime createdAt
        , String createdBy
        , LocalDateTime modifiedAt
        , String modifiedBy
) {
    public static CategoryDto of(Long id, String name, List<ItemDto> itemDto, Category parent, List<CategoryDto> child, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new CategoryDto(id, name, itemDto, parent, child, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static CategoryDto from(Category entity){
        return new CategoryDto(
                entity.getId()
                , entity.getName()
                , entity.getItems().stream()
                    .map(ItemDto::from)
                    .toList()
                , entity.getParent()
                , entity.getChild().stream()
                    .map(CategoryDto::from)
                    .toList()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    }
}
