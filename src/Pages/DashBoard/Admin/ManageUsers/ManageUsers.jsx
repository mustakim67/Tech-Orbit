import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(true);

    // Fetch all users
    const { data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            setLoading(false);
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
                icon: "success",
                title: "Congratulations!",
                text: `User is promoted to ${variables.role}`,
                timer: 2000,
                showConfirmButton: false,
            });
            queryClient.invalidateQueries(["users"]);
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Sorry !",
                text: "Failed to upgrade role",
            });
        },
    });

    const handleRoleUpdate = (userId, role) => {
        updateRole.mutate({ userId, role });
    };

    if (loading)
        return (
            <div className="text-center py-10">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );

    return (
        <div className="mx-auto md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-base-content">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full rounded-xl shadow bg-base-100">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Moderator</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody className="text-base-content">
                        {users.map((user, i) => (
                            <tr key={user._id} className="hover:bg-base-200">
                                <td>{i + 1}</td>
                                <td>{user.name ? user.name : user.displayName}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role !== "moderator" && (
                                        <button
                                            onClick={() =>
                                                handleRoleUpdate(user._id, "moderator")
                                            }
                                            className="btn btn-sm btn-outline btn-info"
                                        >
                                            Make Moderator
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() =>
                                                handleRoleUpdate(user._id, "admin")
                                            }
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
