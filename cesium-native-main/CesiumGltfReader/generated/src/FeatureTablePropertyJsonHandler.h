// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include <CesiumGltf/FeatureTableProperty.h>
#include <CesiumJsonReader/ExtensibleObjectJsonHandler.h>
#include <CesiumJsonReader/IntegerJsonHandler.h>
#include <CesiumJsonReader/StringJsonHandler.h>

namespace CesiumJsonReader {
class ExtensionReaderContext;
}

namespace CesiumGltfReader {
class FeatureTablePropertyJsonHandler
    : public CesiumJsonReader::ExtensibleObjectJsonHandler {
public:
  using ValueType = CesiumGltf::FeatureTableProperty;

  FeatureTablePropertyJsonHandler(
      const CesiumJsonReader::ExtensionReaderContext& context) noexcept;
  void reset(
      IJsonHandler* pParentHandler,
      CesiumGltf::FeatureTableProperty* pObject);

  virtual IJsonHandler* readObjectKey(const std::string_view& str) override;

protected:
  IJsonHandler* readObjectKeyFeatureTableProperty(
      const std::string& objectType,
      const std::string_view& str,
      CesiumGltf::FeatureTableProperty& o);

private:
  CesiumGltf::FeatureTableProperty* _pObject = nullptr;
  CesiumJsonReader::IntegerJsonHandler<int32_t> _bufferView;
  CesiumJsonReader::StringJsonHandler _offsetType;
  CesiumJsonReader::IntegerJsonHandler<int32_t> _arrayOffsetBufferView;
  CesiumJsonReader::IntegerJsonHandler<int32_t> _stringOffsetBufferView;
};
} // namespace CesiumGltfReader
