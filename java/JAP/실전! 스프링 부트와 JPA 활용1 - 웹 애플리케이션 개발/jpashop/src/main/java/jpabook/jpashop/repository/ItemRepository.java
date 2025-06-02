package jpabook.jpashop.repository;

import jakarta.persistence.EntityManager;
import jpabook.jpashop.domain.Member;
import jpabook.jpashop.domain.item.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ItemRepository {
    private final EntityManager em;

    public void save(Item item){
        if(item.getId() == null){
            em.persist(item);
        }else{
            /* 업데이트
            * 중영속상태의 내용을 영속상태로 변경할 때 사용하는 기능
            * Item merge = em.merge(item)
            * merge - 영속상태 이나, em.merge(item) - 영속상태로 변하지 않는다.
            *
            * 주의 : 변경을 원하는 속성만 선택해서 변경, 병합을 사용하면 모든 속성이 변경된다.
            * 병합시 값이 없으면 null로 업데이트 될 수 있다. */
            em.merge(item);
        }
    }

    public Item findOne(Long id){
        return em.find(Item.class, id);
    }

    public List<Item> findAll(){
        return em.createQuery("SELECT i FROM Item i", Item.class)
                .getResultList();
    }
}
