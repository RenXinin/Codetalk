import { Cartographic, CesiumTerrainProvider, sampleTerrain } from "@cesium/engine";
import assert from "node:assert";

// NodeJS smoke screen test

const provider = new CesiumTerrainProvider({
    url: "https://s3.amazonaws.com/cesiumjs/smallTerrain",
  });
  sampleTerrain(provider, 11, [
    Cartographic.fromDegrees(86.925145, 27.988257),
    Cartographic.fromDegrees(87.0, 28.0),
  ]).then((results) => {
    assert(results[0].height > 5000);
    assert(results[0].height < 10000);
    assert(results[1].height > 5000);
    assert(results[1].height < 10000);
  });