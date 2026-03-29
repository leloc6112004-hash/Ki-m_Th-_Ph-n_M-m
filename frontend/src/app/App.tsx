import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { AuthProvider, AppointmentProvider, MedicalRecordProvider, DoctorAuthProvider } from "./context";

export default function App() {
  return (
    <AuthProvider>
      <DoctorAuthProvider>
        <AppointmentProvider>
          <MedicalRecordProvider>
            <RouterProvider router={router} />
            <Toaster position="top-center" richColors />
          </MedicalRecordProvider>
        </AppointmentProvider>
      </DoctorAuthProvider>
    </AuthProvider>
  );
}