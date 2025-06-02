package jpabook.jpashop.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter @Getter
@ToString(callSuper = true, exclude = "order")
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(staticName = "of")
public class Delivery extends  AuditingFields{
    @Id
    @GeneratedValue
    @Column(name = "delivery_id", nullable = false)
    private Long id;

    @OneToOne(mappedBy = "delivery", fetch = FetchType.LAZY)
    private Order order;

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;
}
