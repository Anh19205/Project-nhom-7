package com.hannah.file_service.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileService {
    public Object uploadFiles(MultipartFile file) throws IOException {
        Path path = Paths.get("D:/workspace/laptrinhjava/media");
        String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String name = Objects.isNull(fileExtension)
                ? UUID.randomUUID().toString()
                : UUID.randomUUID().toString() + "." + fileExtension;
        Path filePath = path.resolve(name).normalize().toAbsolutePath();
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return null;
    }
}
