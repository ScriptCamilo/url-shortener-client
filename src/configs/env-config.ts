import env from 'env-var';

export const envConfig = {
  nodeEnv: env.get('NODE_ENV').default('development').asString(),
  backendUrl: env.get('BACKEND_URL').required().asUrlString(),
};
