// This file was generated by generate-classes.
// DO NOT EDIT THIS FILE!
#pragma once

#include <CesiumGltf/FeatureIDs.h>
#include <CesiumJsonReader/ExtensibleObjectJsonHandler.h>
#include <CesiumJsonReader/IntegerJsonHandler.h>
#include <CesiumJsonReader/StringJsonHandler.h>

namespace CesiumJsonReader {
class ExtensionReaderContext;
}

namespace CesiumGltfReader {
class FeatureIDsJsonHandler
    : public CesiumJsonReader::ExtensibleObjectJsonHandler {
public:
  using ValueType = CesiumGltf::FeatureIDs;

  FeatureIDsJsonHandler(
      const CesiumJsonReader::ExtensionReaderContext& context) noexcept;
  void reset(IJsonHandler* pParentHandler, CesiumGltf::FeatureIDs* pObject);

  virtual IJsonHandler* readObjectKey(const std::string_view& str) override;

protected:
  IJsonHandler* readObjectKeyFeatureIDs(
      const std::string& objectType,
      const std::string_view& str,
      CesiumGltf::FeatureIDs& o);

private:
  CesiumGltf::FeatureIDs* _pObject = nullptr;
  CesiumJsonReader::StringJsonHandler _attribute;
  CesiumJsonReader::IntegerJsonHandler<int64_t> _constant;
  CesiumJsonReader::IntegerJsonHandler<int64_t> _divisor;
};
} // namespace CesiumGltfReader
