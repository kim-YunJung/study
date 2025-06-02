package jpabook.jpashop.service;

import jpabook.jpashop.domain.Member;
import jpabook.jpashop.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)/* 기본적으로 해당 설정이 적용된다. */
@RequiredArgsConstructor/* 4 final이 붙어 있는 요소를 생성자로 만들어 준다. */
public class MemberService {
    /* 1
    @Autowired
    private MemberRepository memberRepository;
    */

    /*2
    private MemberRepository memberRepository;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }*/

    /* 1 방식으로 적용 시, 테스트 코드시 변경이 불가
     * 2 방식으로 적용 시, 테스트 코드에서 임시데이터등을 입력이 가능
     * 3 방식으로 적용 시, 생성자 생성시 주입된다.*/
    private final MemberRepository memberRepository;

    /*3
    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }*/

    /* 회원가입 */
    @Transactional/* 별개의 설정을 넣고 싶을 경우 별도로 지정해준다. */
    public Long join(Member member){
        validateDuplicateMember(member);

        memberRepository.save(member);

        return member.getId();
    }

    /* 중복 회원 검증 */
    private void validateDuplicateMember(Member member){
        List<Member> findMembers = memberRepository.findeByName(member.getName());
        if(!findMembers.isEmpty()){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    /* 회원 전체 조회 */
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    /* 회원 단건 조회 */
    public Member findOne(Long memgerId){
        return memberRepository.findOne(memgerId);
    }
}
