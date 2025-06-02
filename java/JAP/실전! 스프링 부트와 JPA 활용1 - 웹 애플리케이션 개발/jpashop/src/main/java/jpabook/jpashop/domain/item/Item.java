package jpabook.jpashop.domain.item;

import jakarta.persistence.*;
import jpabook.jpashop.domain.AuditingFields;
import jpabook.jpashop.domain.Category;
import jpabook.jpashop.exception.NotEnoughStockException;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Setter @Getter
/* 상속관계전략 */
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
@ToString(callSuper = true, exclude = "categories")
/* callSuper = true 상속받은 클래스의 정보까지 출력
* exclude 제외할 필드를 지정 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class Item extends AuditingFields {
    @Id
    @GeneratedValue
    @Column(name = "item_id", nullable = false)
    private Long id;

    private String name;

    private int price;

    private int stockQuantity;

    /* @OneToMany(fetch = FetchType.LAZY) -> @XXXToMany - 속성이 지연로딩이다.
    *  @ManyToOne(fetch = FetchType.EAGER) -> @XXXToOne - 속성이 즉시로딩이다.
    *  => 즉시로딩 부분을 지연로딩으로 변경해줘야한다. */
    @ManyToMany(mappedBy = "items")
    private List<Category> categories = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return Objects.equals(id, item.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    /* 비즈니스 로직 */
    /**
    * 제고 수량 증가
    */
    public void addStock(int quantity){
        this.stockQuantity += quantity;
    }

    /**
     * 제고 수량 감소
     */
    public void removeStock(int quantity) {
        int restStock = this.stockQuantity -= quantity;
        if(restStock < 0){
            throw new NotEnoughStockException("need more stock");
        }
        this.stockQuantity = restStock;
    }
}
