import { DefaultLogger, LogLevel, mergeConfig } from "@vendure/core";
import {
  createTestEnvironment,
  registerInitializer,
  SimpleGraphQLClient,
  SqljsInitializer,
  testConfig,
} from "@vendure/testing";
import { TestServer } from "@vendure/testing/lib/test-server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import path from "path";

import { StarkBankPlugin } from "../src/starkbank.plugin";
import { initialData } from "./initial-data";

describe("Example plugin e2e", function () {
  let server: TestServer;
  let adminClient: SimpleGraphQLClient;
  let shopClient: SimpleGraphQLClient;
  let serverStarted = false;

  beforeAll(async () => {
    registerInitializer("sqljs", new SqljsInitializer("__data__"));
    const config = mergeConfig(testConfig, {
      logger: new DefaultLogger({ level: LogLevel.Debug }),
      plugins: [
        StarkBankPlugin
      ],
    });

    ({ server, adminClient, shopClient } = createTestEnvironment(config));
    await server.init({
      initialData,
      productsCsvPath: path.join(__dirname, "./product-import.csv"),
    });
  }, 60000);

  it("Should start successfully", async () => {
    await expect(server.app.getHttpServer).toBeDefined;
  });

  // TODO: write your tests here
  it("My little testcase", async () => {
    await expect(true).toBe(true);
  });

  afterAll(() => {
    return server.destroy();
  });
});
