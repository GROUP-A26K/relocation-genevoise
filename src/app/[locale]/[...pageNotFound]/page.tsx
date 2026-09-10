import ErrorPage from '@/components/sections/ErrorPage';
import '@/styles/globals.css';

export default function NotFound() {
  return <ErrorPage errorCode={404} />;
}
