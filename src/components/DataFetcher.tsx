import { ReactNode } from "react";
import { useFetch } from "../hooks/useFetch";

interface DataFetcherProps<T> {
  url: string;
  children: (data: T) => ReactNode;
  loading?: ReactNode;
  error?: (message: string) => ReactNode;
}

/**
 * Render props pattern for data fetching.
 * Delegates rendering to the consumer while handling loading/error states.
 *
 * @example
 * <DataFetcher<User[]> url="/api/users">
 *   {(users) => users.map(u => <UserCard key={u.id} user={u} />)}
 * </DataFetcher>
 */
export function DataFetcher<T>({
  url,
  children,
  loading = <p>Loading...</p>,
  error = (msg) => <p className="text-red-500">Error: {msg}</p>,
}: DataFetcherProps<T>) {
  const { data, loading: isLoading, error: fetchError } = useFetch<T>(url);

  if (isLoading) return <>{loading}</>;
  if (fetchError) return <>{error(fetchError)}</>;
  if (!data) return null;

  return <>{children(data)}</>;
}
