import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import type { AnyObject, Maybe, StringMap } from "./helpers";

export interface IDBObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: number;
  createdById: Maybe<string>;
}

export type GqlRequest = <ResultT = AnyObject, VariablesT = AnyObject>(
  query: string | DocumentNode | TypedDocumentNode<ResultT, VariablesT>,
  variables?: VariablesT,
  options?: {
    checkPermissions?: boolean;
    headers?: StringMap;
  }
) => Promise<ResultT>;

export type InvokeFunctionCallback = <
  ResponseT extends InvokeFunctionResponse = InvokeFunctionResponse,
  ArgsT = AnyObject
>(
  name: string,
  args?: ArgsT,
  options?: { waitForResponse: boolean; checkPermissions?: boolean }
) => Promise<ResponseT>;

export type InvokeFunctionResponse<ResultT = any> = {
  completed: boolean;
  result?: ResultT;
  error?: string;
};

export type FunctionContext = {
  api: {
    gqlRequest: GqlRequest;
    url: string;
  };
  invokeFunction: InvokeFunctionCallback;
  workspaceId: string;
  environmentId: string;
  environmentName: string;
  userId?: Maybe<string>;
};

export type FunctionResponseObject<DataT = AnyObject, ErrorT = AnyObject> = {
  data?: DataT;
  errors?: ErrorT[];
};

export type ResolverEvent<DataT = AnyObject> = {
  data: DataT;
  headers: StringMap;
};

export type ResolverResponse<
  DataT = AnyObject,
  ErrorT = AnyObject
> = Promise<FunctionResponseObject<DataT, ErrorT> | void>;

export type TaskEvent<ArgsT = AnyObject> = ArgsT;

export type TaskResponse<ResponseT = any> = Promise<ResponseT>;

export type BeforeCreateTriggerFunctionEvent<
  DataT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT;
  headers: StringMap;
} & ExtendObjectT;

export type BeforeUpdateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalObjectT = AnyObject,
  FilterT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT;
  filter?: FilterT;
  force?: boolean;
  destroyDetached?: boolean;
  originalObject: OriginalObjectT & IDBObject;
  headers: StringMap;
} & ExtendObjectT;

export type BeforeDeleteTriggerFunctionEvent<
  OriginalObjectT = AnyObject,
  FilterT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  filter: FilterT;
  force?: boolean;
  destroyDeleted?: boolean;
  originalObject: OriginalObjectT & IDBObject;
  headers: StringMap;
} & ExtendObjectT;

export type AfterCreateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  headers: StringMap;
} & ExtendObjectT;

export type AfterUpdateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  OriginalObjectT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT & IDBObject;
  headers: StringMap;
} & ExtendObjectT;

export type AfterDeleteTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalObjectT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalObject: OriginalObjectT & IDBObject;
  headers: StringMap;
} & ExtendObjectT;

export type TriggerResponse<
  DataT = AnyObject,
  ErrorT = AnyObject
> = Promise<FunctionResponseObject<DataT, ErrorT> | void>;

export type WebhookFunctionEvent<
  DataT extends StringMap = StringMap,
  PathParametersT extends StringMap = StringMap
> = {
  data: DataT;
  body: string;
  headers: StringMap;
  pathParameters?: PathParametersT;
};

export type WebhookResponse = Promise<{
  body?: string;
  headers?: StringMap;
  statusCode: number;
}>;

export type ResolverFunction<
  EventData = AnyObject,
  ResultData = AnyObject,
  ResultError = AnyObject
> = (
  event: ResolverEvent<EventData>,
  ctx: FunctionContext
) => ResolverResponse<ResultData, ResultError>;

export type TaskFunction<EventArgs = AnyObject, ResultResponse = any> = (
  event: TaskEvent<EventArgs>,
  ctx: FunctionContext
) => TaskResponse<ResultResponse>;

export type BeforeCreateTriggerFunction<
  EventData = AnyObject,
  ResultData = AnyObject,
  ResultError = AnyObject
> = (
  event: BeforeCreateTriggerFunctionEvent<EventData>,
  ctx: FunctionContext
) => TriggerResponse<ResultData, ResultError>;

export type BeforeUpdateTriggerFunction<
  EventData = AnyObject,
  EventOriginalObject = AnyObject,
  ResultData = AnyObject,
  ResultError = AnyObject
> = (
  event: BeforeUpdateTriggerFunctionEvent<EventData, EventOriginalObject>,
  ctx: FunctionContext
) => TriggerResponse<ResultData, ResultError>;

export type BeforeDeleteTriggerFunction<
  EventOriginalObject = AnyObject,
  ResultData = AnyObject,
  ResultError = AnyObject
> = (
  event: BeforeDeleteTriggerFunctionEvent<EventOriginalObject>,
  ctx: FunctionContext
) => TriggerResponse<ResultData, ResultError>;

export type AfterCreateTriggerFunction<
  EventData = AnyObject,
  EventOriginalData = AnyObject,
  ResultData = AnyObject
> = (
  event: AfterCreateTriggerFunctionEvent<EventData, EventOriginalData>,
  ctx: FunctionContext
) => TriggerResponse<ResultData, never>;

export type AfterUpdateTriggerFunction<
  EventData = AnyObject,
  EventOriginalData = AnyObject,
  EventOriginalObject = AnyObject,
  ResultData = AnyObject
> = (
  event: AfterUpdateTriggerFunctionEvent<
    EventData,
    EventOriginalData,
    EventOriginalObject
  >,
  ctx: FunctionContext
) => TriggerResponse<ResultData, never>;

export type AfterDeleteTriggerFunction<
  EventData = AnyObject,
  EventOriginalObject = AnyObject
> = (
  event: AfterDeleteTriggerFunctionEvent<EventData, EventOriginalObject>,
  ctx: FunctionContext
) => Promise<void>;

export type WebhookFunction<
  EventData extends StringMap = StringMap,
  EventPathParameters extends StringMap = StringMap
> = (
  event: WebhookFunctionEvent<EventData, EventPathParameters>,
  ctx: FunctionContext
) => WebhookResponse;
