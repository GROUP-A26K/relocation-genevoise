import ErrorPage from '@/components/sections/ErrorPage';

export default function Forbidden() {
  return <ErrorPage errorCode={403} />;
}
