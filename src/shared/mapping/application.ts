import { AppTemplateInput } from "../enum/application";

export const appTemplateInputNameMapping = new Map<AppTemplateInput, string>([
  [AppTemplateInput.VIDEO_STREAM, /* */'视频流服务'],
  [AppTemplateInput.IMAGE, /*        */'图片服务'],
])
