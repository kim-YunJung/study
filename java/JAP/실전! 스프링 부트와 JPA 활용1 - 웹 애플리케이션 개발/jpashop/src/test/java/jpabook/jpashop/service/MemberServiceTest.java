package jpabook.jpashop.service;

import jakarta.persistence.EntityManager;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("서비스 로직 - 회원")
@SpringBootTest
@Transactional
class MemberServiceTest {
    //@Autowired MemberService memberService;

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final EntityManager em;

    @Autowired
    public MemberServiceTest(MemberService memberService
            , MemberRepository memberRepository
            , EntityManager em
    ) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.em = em;
    }

    @DisplayName("회원 - 회원가입")
    @Test
    //@Rollback(false)
    public void 회원가입() throws Exception{
        //given
        Member member = new Member();
        member.setName("KIM");

        //when
        Long memberId = memberService.join(member);

        //then
        em.flush();/* flush db에 반영을 한다. 트랜잭션만 있을 경우 영속성에 의해 insert문을 날리지 않는다. */
        assertEquals(member, memberRepository.findOne(memberId));
    }

    /*
    @DisplayName("회원 - 중복_회원_예외")
    @Test
    public void 중복_회원_예외() throws Exception{
        //given
        Member member1 = new Member();
        member1.setName("KIM");

        Member member2 = new Member();
        member2.setName("KIM");

        //when
        memberService.join(member1);
        try {
            memberService.join(member2);
        }catch (IllegalStateException e){
            return;
        }

        //then
        fail("예외가 발생한다.");
    }
    */

    @DisplayName("회원 - 중복_회원_예외")
    @Test
    public void 중복_회원_예외() throws Exception{
        //given
        Member member1 = new Member();
        member1.setName("KIM");

        Member member2 = new Member();
        member2.setName("KIM");

        //when
        memberService.join(member1);

        assertThrows(IllegalStateException.class, () -> {
            memberService.join(member2);
        });

        //then
    }

    /*
    private MemberDto createMemberDto(){
        return MemberDto.of(1L, "Kim", careateAddressDto(), createOrderDto(), LocalDateTime.now(), "YUNI", LocalDateTime.now(), "YUNI");
    };

    private AddressDto careateAddressDto(){
        return AddressDto.of("SEOUL", "SEOUL", "12345");
    }

    private OrderDto createOrderDto(){
        return OrderDto.of(1L, 1L, createOrderItemsDto(), createDeliverDto(), OrderStatus.ORDER, LocalDateTime.now(), LocalDateTime.now(), "YUNI", LocalDateTime.now(), "YUNI");
    }
    */
}