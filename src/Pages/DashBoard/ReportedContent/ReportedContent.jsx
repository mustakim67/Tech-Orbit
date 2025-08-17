import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ReportedContent = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Get reported products
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ["reportedProducts"],
        queryFn: async () => {
            const res = await axiosSecure.get("/reports");
            return res.data;
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async ({ productId, reportId }) => {
            await axiosSecure.delete(`/products/${productId}`);
            await axiosSecure.delete(`/reports/${reportId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["reportedProducts"]);
            Swal.fire("Deleted!", "Product has been removed.", "success");
        },
        onError: () => {
            Swal.fire("Error!", "Failed to delete the product.", "error");
        },
    });

    const handleDelete = (productId, reportId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This product and its report will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate({ productId, reportId });
            }
        });
    };

    if (isLoading) return <div className="text-center py-10"><span className="loading loading-spinner loading-xl"></span></div>;

    return (
        <div className="mx-auto md:p-6">
            {reports.length === 0 ? (
                <p className="text-gray-600 flex justify-center items-center mt-20">No reported products found.</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-6 text-blue-900">Reported Contents</h2>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="table table-zebra w-full shadow border border-gray-200">
                            <thead className="bg-blue-100 text-blue-800">
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>View</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report, idx) => (
                                    <tr key={report._id} className="hover:bg-base-100">
                                        <td>{idx + 1}</td>
                                        <td>{report.
                                            productName
                                        }</td>
                                        <td>
                                            <Link to={`/product-details/${report.productId}`}>
                                                <button className="btn btn-sm bg-blue-900 text-white">
                                                    View Details
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(report.productId, report._id)}
                                                className="btn btn-sm bg-red-500 text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>

            )}
        </div>
    );
};

export default ReportedContent;
