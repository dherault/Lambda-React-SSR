# Lambda React SSR

This universal Nodejs app run on AWS Lambda and API Gateway, is built using the [Serverless](https://github.com/serverless/serverless) framework and features:

- [x] Redux state management with hot reloading of React components (nothing in reducers thought)
- [x] React server-side rendering (with 200, 404, 500 status codes)
- [x] Graphql data fetching endpoint for DynamoDB (with 200, 400, 404, 409, 500 status codes)
- [ ] Authentication with AWS Cognito (see this repo: [LambdAuth](https://github.com/danilop/LambdAuth))

### Licence

GNU General Public License version 3 (GPL-3.0)
