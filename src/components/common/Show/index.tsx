export interface IShowProps<
  T,
  R extends Exclude<NonNullable<T>, false> = Exclude<NonNullable<T>, false>,
> {
  when: T;
  fallback?: React.ReactNode;
  checkFn?: (value: T) => value is R;

  children: React.ReactNode | ((props: R) => React.ReactNode);
}

export default function Show<
  T,
  R extends Exclude<NonNullable<T>, false> = Exclude<NonNullable<T>, false>,
>({
  when,
  children,
  fallback = null,
  checkFn = (v): v is R => !!v,
}: IShowProps<T, R>) {
  if (!checkFn(when)) {
    return <>{fallback}</>;
  }

  return typeof children === 'function' ? children(when) : children;
}
