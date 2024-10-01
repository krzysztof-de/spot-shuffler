"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SubmitButton from "../form/SubmitButton";
import { registerUser } from "@/actions/actions";

const Register = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await registerUser(formData);

    if (res?.error) return toast.error(res.error);

    if (res?.isCreated) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  };

  return (
    <div className="wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow rounded bg-body" action={handleSubmit}>
          <h2 className="mb-4">Join Us</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email_field">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password_field">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
            />
          </div>
          <SubmitButton text="Register" className="btn btn-primary w-100" />
        </form>
      </div>
    </div>
  );
};

export default Register;
