import ProtectedRoute from "@/src/component/ProtectedRoute/ProtectedRoute";

export default function AdminHome() {
  return (
    <ProtectedRoute>
      <div className="ml-60 pt-[85px] px-4 h-[calc(100vh-85px)] flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-[#000] text-2xl font-semibold">
            Welcome Dashboard Page
          </h1>
          <h1 className="text-lg">Hiiii</h1>
        </div>
      </div>
    </ProtectedRoute>
  );
}
