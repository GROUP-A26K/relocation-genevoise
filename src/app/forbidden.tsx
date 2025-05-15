import ErrorPage from '@/components/sections/ErrorPage';

export default async function Forbidden() {
  return <ErrorPage errorCode={403} />;
}
