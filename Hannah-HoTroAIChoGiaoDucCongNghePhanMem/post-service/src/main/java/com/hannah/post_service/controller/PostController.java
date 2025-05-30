package com.hannah.post_service.controller;

import com.hannah.post_service.dto.request.PostRequest;
import com.hannah.post_service.dto.response.ApiResponse;
import com.hannah.post_service.dto.response.PostResponse;
import com.hannah.post_service.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostController {
    PostService postService;

    @PostMapping("/createPost")
    public ApiResponse<PostResponse> createPost(@RequestBody PostRequest request){
        PostResponse postResponse = postService.createPost(request);
        return ApiResponse.<PostResponse>builder()
                .result(postResponse)
                .build();
    }

    @GetMapping("/myPosts")
    public ApiResponse<List<PostResponse>> myPosts(){
        List<PostResponse> postResponses = postService.getListPost();
        return ApiResponse.<List<PostResponse>>builder()
                .result(postResponses)
                .build();
    }
}
