package com.namejm.jtalk.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;

@Table(name = "users")
@Entity
@Getter
@Setter
@ToString
@DynamicInsert
public class UserVO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_token", nullable = false)
    private String token;

    @Column(name = "user_name", nullable = false, length = 50)
    private String username;

    @Column(name = "user_phone", nullable = false, length = 30)
    private String userPhone;

    @Column(name = "user_email", nullable = false, length = 30)
    private String userEmail;

    @ColumnDefault("true")
    @Column(name = "use_yn", nullable = false, length = 30)
    private boolean useYn;

    @ColumnDefault("false")
    @Column(name = "del_yn", nullable = false, length = 30)
    private boolean delYn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
