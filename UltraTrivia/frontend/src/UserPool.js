import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_qzkz9I4xL',
  ClientId: '2f4sc8c7580bo68jotflq4sr3l'
};

export default new CognitoUserPool(poolData);