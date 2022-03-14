import { DocumentNode } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type GqlRequest = <Result = Record<string, any>, Variables = Record<string, any>>(
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
  invokeFunction: <Result extends InvokeFunctionResult = InvokeFunctionResult, Args = Record<string, any>>(
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
  Data = Record<string, any>,
  OriginalObject = Record<string, any>,
  ExtendObject = Record<string, any>,
  Error = Record<string, any>
  > = {
  data: Data;
  originalObject: OriginalObject;
  errors: Error[];
  body: string;
  headers: { [key: string]: string | undefined };
} & ExtendObject;

export type FunctionResult<
  Data = Record<string, any>,
  OriginalObject = Record<string, any>,
  ExtendObject = Record<string, any>,
  Error = Record<string, any>
  > = Promise<
  {
    data?: Data;
    originalObject?: OriginalObject;
    errors?: Error[];
    body?: string;
  } & ExtendObject
  >;
