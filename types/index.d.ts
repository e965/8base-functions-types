import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type GqlRequest = <Result = {}, Variables = {}>(
  gqlTag: DocumentNode | TypedDocumentNode<Result, Variables>,
  variables?: Variables,
  options?: {
    checkPermissions?: boolean;
    headers?: Record<string, any>;
  }
) => Promise<Result>;

export type FunctionContext = {
  api: {
    gqlRequest: GqlRequest;
  };
  invokeFunction: <Result extends InvokeFunctionResult = InvokeFunctionResult, Args = {}>(
    name: string,
    args?: Args,
    options?: { waitForResponse: boolean; checkPermissions?: boolean }
  ) => Promise<Result>;
  workspaceId: string;
  environmentId: string;
  environmentName: string;
};

export type InvokeFunctionResult<ResultT = any> = {
  result?: ResultT;
  error?: string;
  completed?: boolean;
};

export type FunctionEvent<
  Data = {},
  OriginalObject = {},
  ExtendObject = {},
  Error = {}
> = {
  data: Data;
  originalObject: OriginalObject;
  errors: Error[];
  body: string;
  headers: { [key: string]: string | undefined };
} & ExtendObject;

export type FunctionResult<
  Data = {},
  OriginalObject = {},
  ExtendObject = {},
  Error = {}
> = Promise<
  {
    data?: Data;
    originalObject?: OriginalObject;
    errors?: Error[];
    body?: string;
  } & ExtendObject
>;
