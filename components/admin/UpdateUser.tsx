'use client'
import { IUser } from "@/backend/models/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../layout/ButtonLoader";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import toast from "react-hot-toast";
import { CustomError } from "@/interfaces/customError";

interface Props {
  data: {
    user: IUser;
  };
}

const UpdateUser = ({ data }: Props) => {
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);
  const [role, setRole] = useState(data?.user?.role);

  const router = useRouter();

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: data?.user?._id, body: userData });
  };

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;
      toast.error(customError?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("User created");
    }
  }, [error, isSuccess, router]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
          <h2 className="mb-4">Update User</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role_field" className="form-label">
              Role
            </label>
            <select
              id="role_field"
              className="form-select"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary form-btn w-100 mt-4 mb-3"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
