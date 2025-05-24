package com.hannah.profile_service.mapper;

import com.hannah.profile_service.dto.request.ProfileRequest;
import com.hannah.profile_service.dto.response.ProfileResponse;
import com.hannah.profile_service.entity.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    Profile toProfile(ProfileRequest profileRequest);
    ProfileResponse toProfileResponse(Profile profile);
    void updateProfile(@MappingTarget Profile profile, ProfileRequest profileRequest);
}
