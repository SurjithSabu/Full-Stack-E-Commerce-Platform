// client/src/screens/admin/UserListScreen.jsx
import { useGetUsersQuery } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="text-red-500">{error?.data?.message || error.error}</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">NAME</th>
              <th className="py-2 px-4 text-left">EMAIL</th>
              <th className="py-2 px-4 text-left">ADMIN</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user._id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">
                  <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                    {user.email}
                  </a>
                </td>
                <td className="py-2 px-4">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-bold">✔</span>
                  ) : (
                    <span className="text-red-600 font-bold">✖</span>
                  )}
                </td>
                <td className="py-2 px-4">
                   {/* We will add Edit/Delete buttons later */}
                   <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;