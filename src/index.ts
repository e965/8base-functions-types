import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

import type { AnyObject, Maybe } from "./helpers";

export type HttpHeaders = Record<string, string | undefined>;

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
    headers?: HttpHeaders;
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

export type InvokeFunctionResponse<ResultT = any> = {
  completed: boolean;
  result?: ResultT;
  error?: string;
};

export type FunctionEvent<DataT = AnyObject, ExtendObjectT = AnyObject> = {
  data: DataT;
  body: string;
  headers: HttpHeaders;
} & ExtendObjectT;

export type FunctionResponse<
  DataT = AnyObject,
  ExtendObjectT = AnyObject,
  ErrorT = AnyObject
> = Promise<(FunctionResponseObject<DataT, ErrorT> & ExtendObjectT) | void>;

export type FunctionResponseObject<DataT = AnyObject, ErrorT = AnyObject> = {
  data?: DataT;
  errors?: ErrorT[];
};

export type BeforeCreateTriggerFunctionEvent<
  DataT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT;
  headers: HttpHeaders;
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
  headers: HttpHeaders;
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
  headers: HttpHeaders;
} & ExtendObjectT;

export type AfterCreateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  headers: HttpHeaders;
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
  headers: HttpHeaders;
} & ExtendObjectT;

export type AfterDeleteTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  OriginalObjectT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT & IDBObject;
  headers: HttpHeaders;
} & ExtendObjectT;

export type WebhookFunctionEvent<T extends string = string> = {
  body: string;
  headers: HttpHeaders;
  pathParameters?: Record<T, string | undefined>;
};

export type WebhookResponse = {
  statusCode: number;
  headers?: HttpHeaders;
  body?: string;
};

/** The most common case for resolver functions  */

export type ResolverFunction<EventData = {}, ResultData = {}> = (
  event: FunctionEvent<EventData>,
  ctx: FunctionContext
) => Promise<FunctionResponse<ResultData>>;

/** The most common case for webhook functions  */

export type WebhookFunction<EventData = {}> = (
  event: FunctionEvent<EventData>,
  ctx: FunctionContext
) => Promise<FunctionResponse<WebhookResponse>>;
