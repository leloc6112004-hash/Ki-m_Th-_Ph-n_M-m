import { useDoctorAuth } from "../context";

export default function DoctorAuthTestPage() {
  const { doctor, isAuthenticated, login, logout } = useDoctorAuth();

  const handleTestLogin = () => {
    const success = login("Bacsi@gmail.com", "Bacsi123@@");
    console.log("Login result:", success);
    console.log("Doctor after login:", doctor);
    console.log("isAuthenticated:", isAuthenticated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Doctor Auth Test Page</h1>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-bold mb-2">Current State:</h2>
            <p><strong>Is Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}</p>
            <p><strong>Doctor Data:</strong></p>
            <pre className="bg-white p-2 rounded mt-2 text-xs overflow-auto">
              {JSON.stringify(doctor, null, 2)}
            </pre>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleTestLogin}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Login
            </button>
            
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded">
            <h3 className="font-bold mb-2">Test Credentials:</h3>
            <p>Email: Bacsi@gmail.com</p>
            <p>Password: Bacsi123@@</p>
          </div>
        </div>
      </div>
    </div>
  );
}
