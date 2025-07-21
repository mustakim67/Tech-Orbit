import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Mutation to update user role
    const updateRole = useMutation({
        mutationFn: async ({ userId, role }) => {
            const res = await axiosSecure.patch(`/users/${userId}`, { role });
            return res.data;
        },
        onSuccess: (data, variables) => {
            Swal.fire({
                icon: 'success',
                title: 'Congratulations!',
                text: `User is promoted to ${variables.role}`,
                timer: 2000,
                showConfirmButton: false
            });
            queryClient.invalidateQueries(["users"]);
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Sorry !',
                text: 'Failed to upgrade role',
            });
        },
    });

    const handleRoleUpdate = (userId, role) => {
        updateRole.mutate({ userId, role });
    };

    if (isLoading) return <div className="text-center py-10">Loading users...</div>;

    return (
        <div className="mx-auto md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white rounded-xl shadow">
                    <thead className="bg-blue-100 text-blue-800">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user._id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role !== "moderator" && (
                                        <button
                                            onClick={() => handleRoleUpdate(user._id, "moderator")}
                                            className="btn btn-sm btn-outline btn-info"
                                        >
                                            Make Moderator
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() => handleRoleUpdate(user._id, "admin")}
                                            className="btn btn-sm btn-outline btn-success"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
