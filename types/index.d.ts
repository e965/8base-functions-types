import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import Dict = NodeJS.Dict;

export type GqlRequest = <Result = Dict<any>, Variables = Dict<any>>(
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
  invokeFunction: <Result extends InvokeFunctionResult = InvokeFunctionResult, Args = Dict<any>>(
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

export type FunctionEvent<Data = Dict<any>, OriginalObject = Dict<any>, ExtendObject = Dict<any>, Error = Dict<any>> = {
  data: Data;
  originalObject: OriginalObject;
  errors: Error[];
  body: string;
  headers: { [key: string]: string | undefined };
} & ExtendObject;

export type FunctionResult<
  Data = Dict<any>,
  OriginalObject = Dict<any>,
  ExtendObject = Dict<any>,
  Error = Dict<any>
  > = Promise<
  {
    data?: Data;
    originalObject?: OriginalObject;
    errors?: Error[];
    body?: string;
  } & ExtendObject
  >;
