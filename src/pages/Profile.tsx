import { useUserData } from "@nhost/react";

function Profile() {
  const user = useUserData(); // ✅ Get current user data

  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  // Ensure firstName and lastName are always strings
  const firstName: any = user.metadata?.firstName || "No First Name";
  const lastName: any = user.metadata?.lastName || "No Last Name";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
            <p className="text-gray-600">Name: {`${firstName} ${lastName}`}</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Email Status</h2>
            <p className={`text-sm ${user.emailVerified ? "text-green-600" : "text-red-600"}`}>
              {user.emailVerified ? "✅ Verified" : "❌ Not Verified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
