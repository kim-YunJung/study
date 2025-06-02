package jpabook.jpashop.dto;
import jpabook.jpashop.domain.Member;
import java.time.LocalDateTime;
import java.util.List;

public record MemberDto(
        Long id,
        String name,
        AddressDto addressDto,
        List<OrderDto> orderDto,
        LocalDateTime createdAt,
        String createdBy,
        LocalDateTime modifiedAt,
        String modifiedBy
) {
    public static MemberDto of(Long id, String name, AddressDto addressDto, List<OrderDto> orderDto, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new MemberDto(id, name, addressDto, orderDto, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static MemberDto from(Member entity){
        return new MemberDto(
                entity.getId()
                , entity.getName()
                , AddressDto.from(entity.getAddress())
                , entity.getOrders().stream()
                    .map(OrderDto::from)
                    .toList()
                , entity.getCreatedAt()
                , entity.getCreatedBy()
                , entity.getModifiedAt()
                , entity.getModifiedBy()
        );
    }
}
