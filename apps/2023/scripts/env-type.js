const difference = require("lodash/difference");
const { readFile, writeFile } = require("node:fs/promises");

const ERROR_HEAD_MSG = "Error#env-type : ";

const _conditionalExit = (condition, message) => {
  if (condition) {
    console.error(`${ERROR_HEAD_MSG}${message}`);
    process.exit(1);
  }
};

const _extractKey = (data) =>
  String(data)
    .split("\n")
    .filter((v) => Boolean(v))
    .filter((v) => !v.match(/^#/))
    .map((v) => v.split("=")[0].trim());

const _readFile = async (path) => readFile(String(path), { encoding: "utf8" });

const main = async () => {
  const envDevFile = await _readFile("./.env.dev");
  const envProdFile = await _readFile("./.env.prod");

  const envDevKeys = _extractKey(envDevFile);
  const envProdKeys = _extractKey(envProdFile);

  _conditionalExit(
    difference(envDevKeys, envProdKeys).length,
    "dev and prod environments have mismatched variables."
  );
  _conditionalExit(
    envDevKeys.length !== envProdKeys.length,
    "dev and prod environments have mismatched size."
  );
  _conditionalExit(
    !envDevKeys.every((k) => typeof k === "string" && k !== "" && !k.includes("=")),
    "invalid environment keys."
  );

  const envKeysStr = envDevKeys.map((k) => `${k}: string;`).join("\n\t\t");

  const data =
    `declare namespace NodeJS {` +
    `\n\tinterface ProcessEnv {` +
    `\n\t\t${envKeysStr}` +
    `\n\t}` +
    `\n}`;
  await writeFile("./import-env.d.ts", data, "utf-8");
};

main();
