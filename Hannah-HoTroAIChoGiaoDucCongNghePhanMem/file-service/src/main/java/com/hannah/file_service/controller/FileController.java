package com.hannah.file_service.controller;

import com.hannah.file_service.dto.response.ApiResponse;
import com.hannah.file_service.dto.response.FileDownloadResponse;
import com.hannah.file_service.dto.response.FileResponse;
import com.hannah.file_service.service.FileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileController {
    FileService fileService;

    @PostMapping("/media/upload")
    public ApiResponse<FileResponse> uploadMedia(@RequestParam(name = "media")MultipartFile file) throws IOException {
        return ApiResponse.<FileResponse>builder()
                .result(fileService.uploadFiles(file))
                .build();
    }

    @GetMapping("/media/download/{name}")
    public ResponseEntity<Resource> downloadMedia(@PathVariable String name) throws IOException {
        FileDownloadResponse fileDownloadResponse = fileService.downloadMedia(name);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, fileDownloadResponse.getContentType())
                .body(fileDownloadResponse.getResource());
    }
}
