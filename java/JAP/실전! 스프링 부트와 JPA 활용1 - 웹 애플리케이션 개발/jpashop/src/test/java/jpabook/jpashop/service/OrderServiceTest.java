package jpabook.jpashop.service;

import jakarta.persistence.EntityManager;
import jpabook.jpashop.domain.Address;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.domain.Order;
import jpabook.jpashop.domain.OrderStatus;
import jpabook.jpashop.domain.item.Book;
import jpabook.jpashop.domain.item.Item;
import jpabook.jpashop.exception.NotEnoughStockException;
import jpabook.jpashop.repository.OrderRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class OrderServiceTest {
    private final OrderService orderService;
    private final OrderRepository orderRepository;
    private final EntityManager em;

    @Autowired
    public OrderServiceTest(OrderService orderService, OrderRepository orderRepository, EntityManager em) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
        this.em = em;
    }

    @DisplayName("주문 - 상품주문")
    @Test
    public void 상품주문() throws Exception{
        //given
        Member member = createMember();
        Book book = createBook("JPA", 10000, 10);

        int orderCount = 2;

        //when
        Long orderId = orderService.order(member.getId(), book.getId(), orderCount);

        //then
        Order getOrder =  orderRepository.findOne(orderId);

        assertEquals(getOrder.getStatus(), OrderStatus.ORDER, "상품 주문시 상태");
        assertEquals(1, getOrder.getOrderItems().size(), "주문환 상품 종류 수");
        assertEquals(10000*orderCount, getOrder.getTotalPrice(), "주문 가격은 가격 * 수량");
        assertEquals(8, book.getStockQuantity(), "주문수량 만큼 재고가 줄어야한다.");
    }

    @DisplayName("주문 - 주문취소")
    @Test
    public void 주문취소() throws Exception{
        //given
        Member member = createMember();
        Item item = createBook("JPA", 10000, 10);

        int orderCount = 2;

        Long orderId = orderService.order(member.getId(), item.getId(), orderCount);

        //when
        orderService.cancelOrder(orderId);

        //then
        Order getOrder =  orderRepository.findOne(orderId);

        assertEquals(getOrder.getStatus(), OrderStatus.CANCEL, "상품 주문시 상태");
        assertEquals(10, item.getStockQuantity(), "주문취소로 수량 원복");
    }

    @DisplayName("주문 - 재고수량초과")
    @Test()
    public void 상품주문_재고수량초과() throws Exception{
        //given
        Member member = createMember();
        Item item = createBook("JPA", 10000, 10);

        int orderCount = 11;

        //then
        assertThrows(NotEnoughStockException.class, () -> {
            //제고 수량 부족 예외가 발생한다.
            orderService.order(member.getId(), item.getId(), orderCount);
        });
    }

    private Book createBook(String name, int price, int stockQuantity) {
        Book book = new Book();
        book.setName(name);
        book.setPrice(price);
        book.setStockQuantity(stockQuantity);

        em.persist(book);

        return book;
    }

    private Member createMember() {
        Member member = new Member();
        member.setName("회원1");
        member.setAddress(new Address("서울","한강","123-45"));

        em.persist(member);

        return member;
    }
    
}