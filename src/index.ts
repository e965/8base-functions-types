import type { DocumentNode } from "graphql";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type AnyObject = Record<string, any>;
export type Maybe<T> = T | null;

export type HttpHeaders = Record<string, string | undefined>;

export interface IDBObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: number;
  createdById: string | null;
}

export interface IKeyFilter {
  id?: string;
}

export type GqlRequest = <
  ResultT = AnyObject,
  VariablesT = AnyObject
>(
  query: string | DocumentNode | TypedDocumentNode<ResultT, VariablesT>,
  variables?: VariablesT,
  options?: {
    checkPermissions?: boolean;
    headers?: HttpHeaders;
  }
) => Promise<ResultT>;

export type FunctionContext = {
  api: {
    gqlRequest: GqlRequest;
  };
  invokeFunction: <
    ResponseT extends InvokeFunctionResponse = InvokeFunctionResponse,
    ArgsT = AnyObject
  >(
    name: string,
    args?: ArgsT,
    options?: { waitForResponse: boolean; checkPermissions?: boolean }
  ) => Promise<ResponseT>;
  workspaceId: string;
  environmentId: string;
  environmentName: string;
  userId: Maybe<string>;
};

export type FunctionEvent<
  DataT = AnyObject,
  ExtendObjectT = AnyObject
> = {
  data: DataT;
  body: string;
  headers: HttpHeaders;
} & ExtendObjectT;

export type FunctionEventArgs<ArgsT = AnyObject> = { data: ArgsT };

export type BeforeCreateTriggerFunctionEvent<
  DataT = AnyObject
> = {
  data: DataT;
  headers: HttpHeaders;
};

export type BeforeUpdateTriggerFunctionEvent<
  DataT = AnyObject,
  FilterT = AnyObject,
  OriginalObjectT = AnyObject
> = {
  data: DataT;
  filter: FilterT & IKeyFilter;
  originalObject: OriginalObjectT & IDBObject;
  headers: HttpHeaders;
};

export type BeforeDeleteTriggerFunctionEvent<
  FilterT = AnyObject,
  OriginalObjectT = AnyObject
> = {
  filter: FilterT & IKeyFilter;
  originalObject: OriginalObjectT & IDBObject;
  headers: HttpHeaders;
};

export type AfterCreateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = DataT
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  headers: HttpHeaders;
};

export type AfterUpdateTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  OriginalObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT & IDBObject;
  headers: HttpHeaders;
};

export type AfterDeleteTriggerFunctionEvent<
  DataT = AnyObject,
  OriginalDataT = AnyObject,
  OriginalObjectT = AnyObject
> = {
  data: DataT & IDBObject;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT & IDBObject;
  headers: HttpHeaders;
};

export type InvokeFunctionResponse<ResultT = any> = {
  completed: boolean;
  result?: ResultT;
  error?: string;
};

export type FunctionResponseObject<
  DataT = AnyObject,
  ErrorT = AnyObject
> = {
  data?: DataT;
  errors?: ErrorT[];
};

export type FunctionResponse<
  DataT = AnyObject,
  ErrorT = AnyObject,
  ExtendObjectT = AnyObject
> = (FunctionResponseObject<DataT, ErrorT> & ExtendObjectT) | void;

export type TriggerResponse<
  DataT = AnyObject,
  ErrorT = TriggerError
> = FunctionResponseObject<DataT, ErrorT>;

export type WebhookResponse = {
  statusCode: number;
  body?: string;
};

export type TriggerError = {
  code: string;
  message: string;
};
