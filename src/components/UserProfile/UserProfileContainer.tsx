import { useFetch } from "../../hooks/useFetch";
import { UserProfilePresenter } from "./UserProfilePresenter";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

/**
 * Container component — handles data fetching and state.
 * Delegates all rendering to the Presenter.
 */
export function UserProfileContainer({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return <UserProfilePresenter user={user} />;
}
