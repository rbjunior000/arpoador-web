import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { config } from "dotenv";

config();

export default defineConfig(() => {
    // Carrega as variáveis de ambiente
    const apiBaseUrl =
        process.env.VITE_API_BASE_URL || "http://localhost:3000";
    const swaggerPath =
        process.env.VITE_SWAGGER_PATH ||
        "/Users/massari/SoftwareDevelopment/kiteflow-api/swagger.json";

    return {
        root: ".",
        input: {
            path: swaggerPath,
        },
        output: {
            path: "./src/~client",
            extension: {
                ts: "",
            },
            barrelType: false,
        },

        plugins: [
            pluginOas({
                validate: false,
            }),

            pluginTs({
                output: {
                    path: "./types",
                    barrelType: "named",
                },
                enumType: "literal",
                dateType: "string",
                syntaxType: "type",
                unknownType: "any",
                optionalType: "questionToken",
                oasType: false,
            }),

            pluginZod({
                output: {
                    path: "zod",
                },
                importPath: "zod",
                version: "4",
            }),

            pluginClient({
                output: {
                    path: "./services",
                    barrelType: "named",
                },
                baseURL: apiBaseUrl,
                parser: "client",
                paramsType: "inline",
                pathParamsType: "object",
                dataReturnType: "full",
                importPath: "../../../kubb.client",
                operations: false,
            }),

            pluginReactQuery({
                output: {
                    path: "./hooks",
                },
                suspense: false,
                paramsType: "inline",
                pathParamsType: "object",
                client: {
                    baseURL: apiBaseUrl,
                    dataReturnType: "full",
                    importPath: "../../../kubb.client",
                },
            }),
        ],
    };
});
