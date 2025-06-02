package jpabook.jpashop.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Setter @Getter
@ToString(callSuper = true, exclude = "orders")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(staticName = "of")
@Table(indexes = {
        @Index(columnList = "name"),
        @Index(columnList = "createdAt"),
        @Index(columnList = "createdBy")
})
public class Member extends AuditingFields{
    @Id @GeneratedValue
    @Column(name = "member_id", nullable = false, updatable = false)
    private Long id;

    private String name;

    @Embedded//내장타입을 포함함을 알려준다.
    private Address address;

    @OneToMany(mappedBy = "member")
    /* 주인이 아닌 쪽은 읽기(조회)만 가능, MappedBy가 정의되지 않은 객체가 주인(Owner)
    * 외래키를 가진 객체를 주인으로 정의 */
    private List<Order> orders = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
