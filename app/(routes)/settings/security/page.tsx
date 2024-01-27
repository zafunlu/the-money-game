import ForgotPasswordForm from "../../forgot/form";

export default function SecuritySettingsPage() {
  return (
    <>
      <div>
        <h1>Password Reset</h1>
        <p className="text-gray-500 text-sm">
          Fill out this form to recieve an e-mail with instructions on updating your password.
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
