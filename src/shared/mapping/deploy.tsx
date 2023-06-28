import React from "react";
import experience from "@src/asset/images/deploy/experience.png";
import formal from "@src/asset/images/deploy/platform.png";

import { DeployType } from "../enum/deploy";
import styled from "styled-components";

const Title = styled.h5`
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 20px;
  color: #3693d1;
  margin-bottom: 0;
  text-align: center;
`;

export const deployTypeLogoMapping: Map<DeployType, any> = new Map([
  [DeployType.EXPERIENCE, experience],
  [DeployType.FORMAL, formal],
]);

export const deployTypeNameMapping = new Map<DeployType, React.ReactNode>([
  [DeployType.EXPERIENCE, <Title>快速体验部署</Title>],
  [DeployType.FORMAL, <Title>正式部署</Title>],
]);

export const deployTypeDescMapping: Map<DeployType, string> = new Map([
  [DeployType.EXPERIENCE, "我们提供设备用于您在线体验应用平台部署"],
  [DeployType.FORMAL, "无需二次开发，即可以运行模型，并支持多项生产级功能"],
]);
