import React from "react";
import appFlowAPI from "@src/apis/appFlow";
import { pipelineAtom } from "./store";
import { useSetAtom } from "jotai";
import AppBuilder, { ModuleDefinition } from "gddi-app-builder";

const useConfig = () => {
  const [version, setVersion] = React.useState<
    AppFlow.ModuleDefinition.Version["version"] | undefined
  >(undefined);
  const [moduleDefinitions, setModuleDefinitions] = React.useState<
    ModuleDefinition | undefined
  >(undefined);
  const setPipeline = useSetAtom(pipelineAtom);

  React.useLayoutEffect(() => {
    appFlowAPI.getDefaultConfig().then(({ success, data }) => {
      if (!success || !data) return;
      const { moduleDefinitions, version } = data;
      setVersion(version || "");
      setModuleDefinitions(moduleDefinitions || {});
    });

    return () => {
      setVersion(undefined);
      setModuleDefinitions(undefined);
      setPipeline(undefined);
    };
  }, []);

  return {
    version,
    moduleDefinitions,
    handleChange: setPipeline,
  };
};

const Config: React.FC = () => {
  const { version, moduleDefinitions, handleChange } = useConfig();

  if (!moduleDefinitions) return null;

  return (
    <AppBuilder
      version={"v3"}
      modules={moduleDefinitions || {}}
      onFlowChange={(val: any) => handleChange(val)}
      propsDisabled
      // onFlowChange={console.log}
    />
    // <AppFlow
    //   moduleDefinitions={moduleDefinitions || {}}
    //   hideDarkModeButton
    //   onValueChange={handleChange}
    //   propEditingDisabled={false}
    //   graphEditingDisabled={false}
    //   version={version || 'v1'}
    //   layoutVertically
    // />
  );
};

export default Config;
