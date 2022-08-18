import type {
  FunctionEvent,
  FunctionContext,
  FunctionResponse,
  WebhookResponse,
} from "./types";

/** The most common case for resolver functions  */

export type EightBaseResolverFunction<EventData = {}, ResultData = {}> = (
  event: FunctionEvent<EventData>,
  ctx: FunctionContext
) => Promise<FunctionResponse<ResultData>>;

/** The most common case for webhook functions  */

export type EightBaseWebhookFunction<EventData = {}> = (
  event: FunctionEvent<EventData>,
  ctx: FunctionContext
) => Promise<FunctionResponse<WebhookResponse>>;
