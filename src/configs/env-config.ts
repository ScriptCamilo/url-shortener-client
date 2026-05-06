import env from 'env-var';

export const envConfig = {
  nodeEnv: env.get('NODE_ENV').default('development').asString(),
  supabaseUrl: env.get('SUPABASE_URL').required().asUrlString(),
  supabaseKey: env.get('SUPABASE_KEY').required().asString(),
  supabasePublishableKey: env.get('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY').required().asString(),
  githubUrl: env.get('GITHUB_URL').required().asString(),
};
