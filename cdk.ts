import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';


const sharedLambdaProps: Partial<NodejsFunctionProps> = {
  runtime: Runtime.NODEJS_18_X,
  environment: {
    DATABASE_NAME: process.env.DATABASE_NAME!,
    DATABASE_HOST: process.env.DATABASE_HOST!,
    DATABASE_PORT: process.env.DATABASE_PORT!,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME!,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD!,
  },
}


const app = new cdk.App();

const stack = new cdk.Stack(app, "CartServiceStack");

const cartLambda = new NodejsFunction(stack, 'cartServiceLambda', {
  ...sharedLambdaProps,
  functionName: 'cartService',
  entry: 'dist/src/main.js',
  timeout: cdk.Duration.seconds(30),
  bundling: {
    externalModules: [
      '@nestjs/microservices/microservices-module',
      '@nestjs/websockets/socket-module',
      '@nestjs/microservices',
      'class-transformer',
      'class-validator',
    ],
  },
});

const api = new apiGateway.HttpApi(stack, 'CartApi', {
  corsPreflight: {
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
    allowHeaders: ['*'],
    allowOrigins: ['*'],
  },
});

api.addRoutes({
  path: '/{api+}',
  methods: [apiGateway.HttpMethod.ANY],
  integration: new HttpLambdaIntegration('cartServiceLambdaIntegration', cartLambda),
});

new cdk.CfnOutput(stack, 'ApiUrl', {
  value: `${api.url}`,
});
