"use client";
import { useLazyUpdateSessionQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { setUser } from "@/redux/features/userSlice";
import { updateUserProfile } from "@/app/actions";
import SubmitButton from "../form/SubmitButton";

const UpdateProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  const handleSubmit = async (formData: FormData) => {
    const res = await updateUserProfile(currentUser?._id, formData);

    if (res?.error) return toast.error(res.error);

    if (res?.isUpdated) {
      toast.success("Profile Updated Successfully");
      //@ts-ignore
      updateSession();
      router.refresh();
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form className="shadow rounded bg-body" action={handleSubmit}>
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              defaultValue={currentUser?.name}
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
              defaultValue={currentUser?.email}
            />
          </div>
          <SubmitButton text="Update" className="btn btn-primary w-100" />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
