import { type ChatCompletionRequestMessage } from 'openai'

export namespace Chat {
  export type ModelType =
    'gpt-4'
    | 'gpt-4-0314'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0314'
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-0301'
    | 'qwen-v1'
    | 'ernie'
    | 'spark'
    | 'llama'
    | 'chatglm';

  export type GType = 'header' | 'rating'

  export type Message = ChatCompletionRequestMessage & {
    date: string
    streaming?: boolean
    isError?: boolean
    id?: number
    model?: ModelType
    gType?: GType
  }

  export type RenderMessage = Message & { preview?: boolean }
}

export namespace GddiChat {
  export interface Props {
    chatStreamURL: string
    timeout?: number
    messageThreshold?: number
    greeting?: string
    getHeaders?: () => Record<string, string>
    modelType?: Chat.ModelType
    ratingTimeout?: number
    ratingURL: string
  }
}
