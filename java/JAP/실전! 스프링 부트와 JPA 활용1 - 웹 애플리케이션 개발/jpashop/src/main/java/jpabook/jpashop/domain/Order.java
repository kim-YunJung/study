package jpabook.jpashop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Setter @Getter
@ToString(callSuper = true, exclude = "orderItems")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(staticName = "of")
@Table(name="ordes")
public class Order extends AuditingFields{
    @Id
    @GeneratedValue
    @Column(name = "order_id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;/* 연관관계의 주인으로 기준점 */

    /*
    Cascade는 엔티티 간 관계가 명확할 때 사용

    특정 엔티티를 영속상태로 만들 때 연관관계에 있는 엔티티도 함께 영속상태로 만들기 위해서 사용한다.
    부모 엔티티를 다룰때 연관 되어있는 자식 엔티티까지 다룰수 있게 해준다.

    CascadeType.ALL - 모든 Cascade를 적용한다.
    CascadeType.PERSIST - 엔티티를 영속화할 때, 연관된 하위 엔티티도 함께 유지한다.
    CascadeType.MERGE - 엔티티 상태를 병합(Merge)할 때, 연관된 하위 엔티티도 모두 병합한다.
    CascadeType.REMOVE - 엔티티를 제거할 때, 연관된 하위 엔티티도 모두 제거한다.
    CascadeType.DETACH - 영속성 컨텍스트에서 엔티티 제거
    부모 엔티티를 detach() 수행하면, 연관 하위 엔티티도 detach()상태가 되어 변경 사항을 반영하지 않는다.
    CascadeType.REFRESH - 상위 엔티티를 새로고침(Refresh)할 때, 연관된 하위 엔티티도 모두 새로고침한다.
    */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @OrderBy("createdAt DESC")
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_id")
    /* FK 접속이 많은 곳에 설정한다. */
    private Delivery delivery;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;//주문상태

    private LocalDateTime orderDate;

    /* === 연관관계 메서드 === */
    public void setMember(Member member){
        this.member = member;
        member.getOrders().add(this);
    }

    public void addOrderItem(OrderItem orderItem){
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    public void setDelivery(Delivery delivery){
        this.delivery = delivery;
        delivery.setOrder(this);
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    /* 생성 메서드 */
    public static Order createOrder(Member member, Delivery delivery, OrderItem ... orderItems){
        Order order = new Order();
        order.setMember(member);
        order.setDelivery(delivery);
        for (OrderItem orderItem : orderItems) {
            order.addOrderItem(orderItem);
        }
        order.setStatus(OrderStatus.ORDER);
        order.setOrderDate(LocalDateTime.now());

        return order;
    }

    /* 비즈니스 로직 */
        /* 주문 취소 */
    public void cancel(){
        if(delivery.getStatus() == DeliveryStatus.COMP){
            throw new IllegalStateException("이미 배송완료된 상품은 취소가 불가능합니다.");
        }
        /* 상태를 주문 취소로 변경 */
        this.setStatus(OrderStatus.CANCEL);

        /* 제고 수량 복구 */
        for (OrderItem orderItem : orderItems) {
            orderItem.cancel();
        }
    }

    /* 조회 로직 */
    /**
     * 전체 주문 가격 조회
     */
    public int getTotalPrice(){
        return orderItems.stream().mapToInt(OrderItem::getTotalPrice).sum();
        /*
        int totalPrice = 0;
        for (OrderItem orderItem : orderItems){
            totalPrice+= orderItem.getTotalPrice();
        }
        return totalPrice;
        */
    }
}
