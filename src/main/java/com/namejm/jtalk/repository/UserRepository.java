package com.namejm.jtalk.repository;

import com.namejm.jtalk.vo.UserVO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserVO, String> {
    UserVO findByToken(String token);
}
