interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

/**
 * Presenter component — pure UI, no data fetching.
 * Easy to test, easy to storybook, easy to reuse.
 */
export function UserProfilePresenter({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-gray-500">{user.email}</p>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {user.role}
        </span>
      </div>
    </div>
  );
}
