import {
  Resource,
  ResourceCache,
  ResourceLoaderState,
  MetadataSchemaLoader,
} from "../../index.js";

describe("Scene/MetadataSchemaLoader", function () {
  const schemaJson = {
    classes: {
      tree: {
        properties: {
          height: {
            type: "SCALAR",
            componentType: "FLOAT32",
          },
          type: {
            type: "ENUM",
            enumType: "treeType",
          },
        },
      },
    },
    enums: {
      treeType: {
        values: [
          {
            name: "Coniferous",
            value: 0,
          },
          {
            name: "Deciduous",
            value: 1,
          },
        ],
      },
    },
  };

  const resource = new Resource({ url: "https://example.com/schema.json" });

  afterEach(function () {
    ResourceCache.clearForSpecs();
  });

  it("throws if neither options.schema nor options.resource are defined", function () {
    expect(function () {
      return new MetadataSchemaLoader({
        schema: undefined,
        resource: undefined,
      });
    }).toThrowDeveloperError();
  });

  it("throws if both options.schema and options.resource are defined", function () {
    expect(function () {
      return new MetadataSchemaLoader({
        resource: resource,
        schema: schemaJson,
      });
    }).toThrowDeveloperError();
  });

  it("rejects promise if schema cannot be fetched", function () {
    spyOn(Resource.prototype, "fetchJson").and.callFake(function () {
      const error = new Error("404 Not Found");
      return Promise.reject(error);
    });

    const schemaLoader = new MetadataSchemaLoader({
      resource: resource,
    });

    schemaLoader.load();

    return schemaLoader.promise
      .then(function (schemaLoader) {
        fail();
      })
      .catch(function (runtimeError) {
        expect(runtimeError.message).toBe(
          "Failed to load schema: https://example.com/schema.json\n404 Not Found"
        );
      });
  });

  it("loads schema from JSON", function () {
    const schemaLoader = new MetadataSchemaLoader({
      schema: schemaJson,
    });
    schemaLoader.load();

    return schemaLoader.promise.then(function (schemaLoader) {
      const schema = schemaLoader.schema;
      expect(schema).toBeDefined();

      const enums = schema.enums;
      expect(enums.treeType).toBeDefined();

      const classes = schema.classes;
      expect(classes.tree).toBeDefined();
    });
  });

  it("loads external schema", function () {
    const fetchJson = spyOn(Resource.prototype, "fetchJson").and.returnValue(
      Promise.resolve(schemaJson)
    );

    const schemaLoader = new MetadataSchemaLoader({
      resource: resource,
    });

    schemaLoader.load();

    return schemaLoader.promise.then(function (schemaLoader) {
      expect(fetchJson).toHaveBeenCalled();

      const schema = schemaLoader.schema;
      expect(schema).toBeDefined();

      const enums = schema.enums;
      expect(enums.treeType).toBeDefined();

      const classes = schema.classes;
      expect(classes.tree).toBeDefined();
    });
  });

  it("destroys schema", function () {
    spyOn(Resource.prototype, "fetchJson").and.returnValue(
      Promise.resolve(schemaJson)
    );

    const schemaLoader = new MetadataSchemaLoader({
      resource: resource,
    });

    expect(schemaLoader.schema).not.toBeDefined();

    schemaLoader.load();

    return schemaLoader.promise.then(function (schemaLoader) {
      expect(schemaLoader.schema).toBeDefined();
      expect(schemaLoader.isDestroyed()).toBe(false);

      schemaLoader.destroy();
      expect(schemaLoader.schema).not.toBeDefined();
      expect(schemaLoader.isDestroyed()).toBe(true);
    });
  });

  function resolveJsonAfterDestroy(rejectPromise) {
    const promise = new Promise(function (resolve, reject) {
      if (rejectPromise) {
        reject(new Error());
      } else {
        resolve(schemaJson);
      }
    });
    spyOn(Resource.prototype, "fetchJson").and.returnValue(promise);

    const schemaLoader = new MetadataSchemaLoader({
      resource: resource,
    });

    expect(schemaLoader.schema).not.toBeDefined();

    schemaLoader.load();
    expect(schemaLoader._state).toBe(ResourceLoaderState.LOADING);
    schemaLoader.destroy();
    return schemaLoader.promise.then(function () {
      expect(schemaLoader.schema).not.toBeDefined();
      expect(schemaLoader.isDestroyed()).toBe(true);
    });
  }

  it("handles resolving json after destroy", function () {
    return resolveJsonAfterDestroy(false);
  });

  it("handles rejecting json after destroy", function () {
    return resolveJsonAfterDestroy(true);
  });
});
