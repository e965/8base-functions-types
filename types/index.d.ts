import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type GqlRequest = <
  ResultT = Record<string, any>,
  VariablesT = Record<string, any>
>(
  query: DocumentNode | TypedDocumentNode<ResultT, VariablesT>,
  variables?: VariablesT,
  options?: {
    checkPermissions?: boolean;
    headers?: Record<string, any>;
  }
) => Promise<ResultT>;

export type FunctionContext = {
  api: {
    gqlRequest: GqlRequest;
  };
  invokeFunction: <
    ResponseT extends InvokeFunctionResponse = InvokeFunctionResponse,
    ArgsT = Record<string, any>
  >(
    name: string,
    args?: ArgsT,
    options?: { waitForResponse: boolean; checkPermissions?: boolean }
  ) => Promise<ResponseT>;
  workspaceId: string;
  environmentId: string;
  environmentName: string;
};

export type InvokeFunctionResponse<ResultT = any> = {
  completed: boolean;
  result?: ResultT;
  error?: string;
};

export type FunctionEvent<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  body: string;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type FunctionResponse<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>,
  ErrorT = Record<string, any>
> = Promise<(FunctionResponseObject<DataT, ErrorT> & ExtendObjectT) | void>;

export type FunctionResponseObject<
  DataT = Record<string, any>,
  ErrorT = Record<string, any>
> = {
  data?: DataT;
  errors?: ErrorT[];
};

export type TriggerResponse<DataT = Record<string, any>> =
  FunctionResponseObject<DataT>;

export type BeforeCreateTriggerFunctionEvent<
  DataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type BeforeUpdateTriggerFunctionEvent<
  DataT = Record<string, any>,
  FilterT = Record<string, any>,
  OriginalObjectT = { id: string } & Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  filter: FilterT;
  originalObject: OriginalObjectT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type BeforeDeleteTriggerFunctionEvent<
  FilterT = Record<string, any>,
  OriginalObjectT = { id: string } & Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  filter: FilterT;
  originalObject: OriginalObjectT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterCreateTriggerFunctionEvent<
  DataT = { id: string } & Record<string, any>,
  OriginalDataT = Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  originalData: OriginalDataT;
  body: string;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterUpdateTriggerFunctionEvent<
  DataT = { id: string } & Record<string, any>,
  OriginalDataT = Record<string, any>,
  OriginalObjectT = { id: string } & Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type AfterDeleteTriggerFunctionEvent<
  DataT = { id: string } & Record<string, any>,
  OriginalDataT = Record<string, any>,
  OriginalObjectT = { id: string } & Record<string, any>,
  ExtendObjectT = Record<string, any>
> = {
  data: DataT;
  originalData: OriginalDataT;
  originalObject: OriginalObjectT;
  headers: Record<string, string | undefined>;
} & ExtendObjectT;

export type WebhookResponse = {
  statusCode: number;
  body?: string;
};
