export type AmplifyDependentResourcesAttributes = {
  "api": {
    "nhlapi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "statsapp": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "nhlapi": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}