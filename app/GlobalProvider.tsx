"use client";
import { store } from "@/redux/store";
import { APIProvider } from "@vis.gl/react-google-maps";
import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { GOOGLE_API_KEY } from "@/backend/utils/consts";

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <APIProvider apiKey={GOOGLE_API_KEY}>
          <SessionProvider>{children}</SessionProvider>
        </APIProvider>
      </Provider>
    </>
  );
}
