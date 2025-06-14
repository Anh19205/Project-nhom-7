package com.hannah.post_service.repository;

import com.hannah.post_service.Entity.Post;
import com.hannah.post_service.constant.PostType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    Page<Post> findAllByUserId(String userId , Pageable pageable);
    Page<Post> findAllByUserIdAndType(String userId, String type, Pageable pageable);
    List<Post> findAllByUserId(String userId);
    Page<Post> findByType(String type, Pageable pageable);
}
