"use server";
import User from "@/backend/models/user";

function extractErrors(e: any) {
  if (e?.code === 11000) {
    return "Email already exists";
  }

  if (e?.response?.data?.message) {
    return e.response.data.message;
  }

  if (e?.message) {
    return e.message;
  }

  return "Something went wrong";
}

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const userData = { name, email, password };

    const data = await User.create(userData);

    if (data?._id) return { isCreated: true };
  } catch (e: any) {
    return {
      isCreated: false,
      error: extractErrors(e),
    };
  }
}

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");

    const userData = { name, email };

    const data = await User.findByIdAndUpdate(userId, userData);

    if (data) return { isUpdated: true };
  } catch (e: any) {
    return {
      isUpdated: false,
      error: extractErrors(e),
    };
  }
}
