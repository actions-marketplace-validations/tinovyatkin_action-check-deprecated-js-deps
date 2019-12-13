import core from "@actions/core";
import getAllDeps from "./get-all-deps";
import checkForDeprecations from "./check-deprecations";

async function run() {
  try {
    const allDeps = getAllDeps();
    core.debug(JSON.stringify(allDeps.entries));
    const deprecations = await checkForDeprecations(allDeps);
    core.setOutput("deprecated", [...deprecations.entries()].join(","));
    if (deprecations.size)
      core.setFailed(`Deprecated: ${[...deprecations.entries()].join(",")}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
