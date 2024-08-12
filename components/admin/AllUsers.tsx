"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/backend/models/user";
import { useDeleteUserMutation } from "@/redux/api/userApi";

interface Props {
  data: {
    users: IUser[];
  };
}

const columns = [
  {
    label: "ID",
    field: "id",
    sort: "asc",
  },
  {
    label: "Name",
    field: "name",
    sort: "asc",
  },
  {
    label: "Email",
    field: "email",
    sort: "asc",
  },
  {
    label: "Role",
    field: "role",
    sort: "asc",
  },
  {
    label: "Actions",
    field: "actions",
    sort: "asc",
  },
];

const AllUsers = ({ data }: Props) => {
  const users = data?.users;
  const router = useRouter();

  const [deleteUser, { error, isLoading, isSuccess }] = useDeleteUserMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("User deleted");
    }
  }, [error, isSuccess]);

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const setUsers = (users: IUser[]) =>
    users?.map((user) => ({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      actions: (
        <div className="d-flex justify-content-center">
          <Link
            href={`/admin/users/${user?._id}`}
            className="btn btn-primary btn-sm"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <button
            className="btn btn-outline-danger mx-2"
            disabled={isLoading}
            onClick={() => handleDeleteUser(user?._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ),
    }));

  return (
    <div className="container mt-5">
      <h2>{users?.length} Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.field}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {setUsers(users)?.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>{row.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
