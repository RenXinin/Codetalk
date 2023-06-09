// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include "TextureAccessorJsonHandler.h"

#include <CesiumGltf/FeatureIDTexture.h>
#include <CesiumJsonReader/ExtensibleObjectJsonHandler.h>
#include <CesiumJsonReader/StringJsonHandler.h>

namespace CesiumJsonReader {
class ExtensionReaderContext;
}

namespace CesiumGltfReader {
class FeatureIDTextureJsonHandler
    : public CesiumJsonReader::ExtensibleObjectJsonHandler {
public:
  using ValueType = CesiumGltf::FeatureIDTexture;

  FeatureIDTextureJsonHandler(
      const CesiumJsonReader::ExtensionReaderContext& context) noexcept;
  void
  reset(IJsonHandler* pParentHandler, CesiumGltf::FeatureIDTexture* pObject);

  virtual IJsonHandler* readObjectKey(const std::string_view& str) override;

protected:
  IJsonHandler* readObjectKeyFeatureIDTexture(
      const std::string& objectType,
      const std::string_view& str,
      CesiumGltf::FeatureIDTexture& o);

private:
  CesiumGltf::FeatureIDTexture* _pObject = nullptr;
  CesiumJsonReader::StringJsonHandler _featureTable;
  TextureAccessorJsonHandler _featureIds;
};
} // namespace CesiumGltfReader
