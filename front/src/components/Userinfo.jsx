"use client";

export default function Userinfo({ user }) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="w-[500px] shadow-lg p-4 mb-4 bg-gray-800 rounded-lg border-t-4 border-blue-500 text-center">
        <div className="mb-4 font-bold text-2xl">
          <h1>User Information</h1>
        </div>
        <div className="mb-4">
          <p>
            Nombre: <span className="font-bold">{user?.fullname}</span>
          </p>
          <p>
            Email: <span className="font-bold">{user?.email}</span>
          </p>
          <p>
            Tipo: <span className="font-bold">{user?.userType}</span>
          </p>
        </div>
        <div>
          <button
            className="bg-red-600 text-amber-50 font-bold cursor-pointer hover:bg-red-700 px-6 py-2 rounded-md"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
