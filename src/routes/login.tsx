import { useNavigate } from "react-router";
import { Login } from "~/components";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login onSubmit={() => {}} />
      </div>
    </div>
  );
}
