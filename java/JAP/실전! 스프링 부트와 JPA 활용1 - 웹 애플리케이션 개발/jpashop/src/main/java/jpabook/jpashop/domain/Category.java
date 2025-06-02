package jpabook.jpashop.domain;

import jakarta.persistence.*;
import jpabook.jpashop.domain.item.Item;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Setter
@Getter
@ToString(callSuper = true, exclude = "child")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(staticName = "of")
public class Category extends AuditingFields{
    @Id @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(name = "category_item"
            , joinColumns = @JoinColumn(name = "category_id")
            , inverseJoinColumns = @JoinColumn(name = "item_id")
    )/* 중간테이블 매핑이 필요함, 실무에서는 사용을 거의 하지 않는다.
    joinColumns - 현재 엔티티를 참조하는 외래키
    inverseJoinColumns - 반대방향 엔티티를 참조하는 외래키
    */
    private List<Item> items = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;//뎁스를 나누기 위해

    @OneToMany(mappedBy = "parent")
    private List<Category> child = new ArrayList<>();

    /* === 연관관계 메서드 === */
    public void addChildCategory(Category child){
        this.child.add(child);
        child.setParent(this);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(id, category.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
