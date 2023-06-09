// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include "CesiumGltf/Library.h"

#include <CesiumUtility/ExtensibleObject.h>

namespace CesiumGltf {
/**
 * @brief Compressed data for bufferView.
 */
struct CESIUMGLTF_API ExtensionBufferExtMeshoptCompression final
    : public CesiumUtility::ExtensibleObject {
  static inline constexpr const char* TypeName =
      "ExtensionBufferExtMeshoptCompression";
  static inline constexpr const char* ExtensionName = "EXT_meshopt_compression";

  /**
   * @brief Set to true to indicate that the buffer is only referenced by
   * bufferViews that have EXT_meshopt_compression extension and as such doesn't
   * need to be loaded.
   */
  bool fallback = false;
};
} // namespace CesiumGltf
