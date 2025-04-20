package com.namejm.jtalk.config;

import com.namejm.jtalk.repository.UserRepository;
import com.namejm.jtalk.util.StringUtils;
import com.namejm.jtalk.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Slf4j
@Component
public class DatabaseInitializer implements ApplicationRunner {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        log.info("Checking and inserting initial stream data if necessary...");

        if (userRepository.count() == 0) {
            log.info("No existing stream data found. Inserting initial data.");
            for(int i = 1; i <= 100; i++) {
                String test = StringUtils.stringPadder(String.valueOf(i), 3);
                UserVO vo = new UserVO();
                vo.setUsername("t" + test);
                vo.setToken("t" + test);
                vo.setUserEmail("t" + test + "@gmail.com");
                vo.setUserPhone("010" + StringUtils.stringPadder(String.valueOf(i), 8));
                userRepository.save(vo);
            }
        }
    }
}