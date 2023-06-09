// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include "CesiumGltf/Library.h"

#include <CesiumUtility/ExtensibleObject.h>

#include <cstdint>

namespace CesiumGltf {
/**
 * @brief Reference to a texture.
 */
struct CESIUMGLTF_API TextureInfo : public CesiumUtility::ExtensibleObject {
  static inline constexpr const char* TypeName = "TextureInfo";

  /**
   * @brief The index of the texture.
   */
  int32_t index = -1;

  /**
   * @brief The set index of texture's TEXCOORD attribute used for texture
   * coordinate mapping.
   *
   * This integer value is used to construct a string in the format
   * `TEXCOORD_<set index>` which is a reference to a key in
   * `mesh.primitives.attributes` (e.g. a value of `0` corresponds to
   * `TEXCOORD_0`). A mesh primitive **MUST** have the corresponding texture
   * coordinate attributes for the material to be applicable to it.
   */
  int64_t texCoord = 0;
};
} // namespace CesiumGltf
