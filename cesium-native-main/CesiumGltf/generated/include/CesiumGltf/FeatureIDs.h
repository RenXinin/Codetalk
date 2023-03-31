// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include "CesiumGltf/Library.h"

#include <CesiumUtility/ExtensibleObject.h>

#include <cstdint>
#include <optional>
#include <string>

namespace CesiumGltf {
/**
 * @brief Feature IDs to be used as indices to property arrays in the feature
 * table.
 */
struct CESIUMGLTF_API FeatureIDs final
    : public CesiumUtility::ExtensibleObject {
  static inline constexpr const char* TypeName = "FeatureIDs";

  /**
   * @brief The name of the attribute containing feature IDs.
   */
  std::optional<std::string> attribute;

  /**
   * @brief Sets a constant feature ID when the attribute property is omitted.
   */
  int64_t constant = 0;

  /**
   * @brief The rate at which feature IDs increment. If `divisor` is 0 then
   * `constant` is used. If `divisor` is non-zero the feature ID increments once
   * per `divisor` sets of elements, starting at `constant`. For example, if
   * `constant` is 0 and `divisor` is 1 the feature IDs are [0, 1, 2, ...]; if
   * `constant` is 2 and `divisor` is 3 the feature IDs are [2, 2, 2, 3, 3, 3,
   * 4, 4, 4, ...]
   */
  int64_t divisor = 0;
};
} // namespace CesiumGltf
