import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [profileForm, setProfileForm] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    });
    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [profileSaving, setProfileSaving] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        const loadProfile = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await API.get("profile/");
                setProfile(res.data);
                setProfileForm({
                    username: res.data.username || "",
                    email: res.data.email || "",
                    first_name: res.data.first_name || "",
                    last_name: res.data.last_name || "",
                });
            } catch (err) {
                setError("Unable to load profile details.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileSaving(true);
        setProfileMessage("");
        setError("");

        try {
            const res = await API.patch("profile/", profileForm);
            setProfile(res.data);
            sessionStorage.setItem("username", res.data.username || "");
            sessionStorage.setItem("email", res.data.email || "");
            setProfileMessage(res.data.message || "Profile updated successfully.");
        } catch (err) {
            const data = err?.response?.data;
            setError(
                data?.username?.[0] ||
                data?.email?.[0] ||
                data?.first_name?.[0] ||
                data?.last_name?.[0] ||
                "Unable to update profile."
            );
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPasswordSaving(true);
        setPasswordMessage("");
        setError("");

        try {
            const res = await API.post("profile/change-password/", passwordForm);
            if (res.data?.token) {
                sessionStorage.setItem("token", res.data.token);
            }
            setPasswordForm({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });
            setPasswordMessage(res.data?.message || "Password updated successfully.");
        } catch (err) {
            const data = err?.response?.data;
            setError(
                data?.current_password?.[0] ||
                data?.new_password?.[0] ||
                data?.confirm_password?.[0] ||
                data?.non_field_errors?.[0] ||
                "Unable to update password."
            );
        } finally {
            setPasswordSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="mx-auto max-w-3xl px-6 py-10">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h1>
                    <p className="mt-2 text-sm text-gray-500">Account details for your store profile.</p>

                    {loading && <p className="mt-8 text-sm text-gray-500">Loading profile...</p>}

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    {!loading && !error && profile && (
                        <div className="mt-8 space-y-8">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InfoCard label="Role" value={profile.is_staff ? "Admin" : "User"} />
                                <InfoCard
                                    label="Joined"
                                    value={profile.date_joined ? new Date(profile.date_joined).toLocaleDateString() : "-"}
                                />
                            </div>

                            <form onSubmit={handleProfileUpdate} className="rounded-2xl border border-gray-100 bg-gray-50/40 p-5">
                                <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <InputField
                                        label="Username"
                                        value={profileForm.username}
                                        onChange={(value) => setProfileForm((prev) => ({ ...prev, username: value }))}
                                    />
                                    <InputField
                                        label="Email"
                                        type="email"
                                        value={profileForm.email}
                                        onChange={(value) => setProfileForm((prev) => ({ ...prev, email: value }))}
                                    />
                                    <InputField
                                        label="First Name"
                                        value={profileForm.first_name}
                                        onChange={(value) => setProfileForm((prev) => ({ ...prev, first_name: value }))}
                                    />
                                    <InputField
                                        label="Last Name"
                                        value={profileForm.last_name}
                                        onChange={(value) => setProfileForm((prev) => ({ ...prev, last_name: value }))}
                                    />
                                </div>

                                {profileMessage && (
                                    <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-medium text-emerald-600">
                                        {profileMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={profileSaving}
                                    className="mt-4 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-600 disabled:opacity-60"
                                >
                                    {profileSaving ? "Saving..." : "Save Profile"}
                                </button>
                            </form>

                            <form onSubmit={handlePasswordUpdate} className="rounded-2xl border border-gray-100 bg-gray-50/40 p-5">
                                <h2 className="text-lg font-bold text-gray-900">Update Password</h2>
                                <div className="mt-4 grid gap-4 sm:grid-cols-1">
                                    <InputField
                                        label="Current Password"
                                        type="password"
                                        value={passwordForm.current_password}
                                        onChange={(value) => setPasswordForm((prev) => ({ ...prev, current_password: value }))}
                                    />
                                    <InputField
                                        label="New Password"
                                        type="password"
                                        value={passwordForm.new_password}
                                        onChange={(value) => setPasswordForm((prev) => ({ ...prev, new_password: value }))}
                                    />
                                    <InputField
                                        label="Confirm New Password"
                                        type="password"
                                        value={passwordForm.confirm_password}
                                        onChange={(value) => setPasswordForm((prev) => ({ ...prev, confirm_password: value }))}
                                    />
                                </div>

                                {passwordMessage && (
                                    <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-medium text-emerald-600">
                                        {passwordMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={passwordSaving}
                                    className="mt-4 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-indigo-600 disabled:opacity-60"
                                >
                                    {passwordSaving ? "Updating..." : "Update Password"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function InputField({ label, type = "text", value, onChange }) {
    return (
        <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</span>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
        </label>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
            <p className="mt-2 text-sm font-semibold text-gray-900 break-all">{value}</p>
        </div>
    );
}
