import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import type { User } from "../types/User";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Login() {
  const navigate = useNavigate();
  const [theme] = useTheme();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      await login(data.usernameOrEmail, data.password);
      navigate("/notes");
    } catch (error) {
      console.error("Giriş yaparken hata:", error);
      // İstersen burada kullanıcıya hata mesajı gösterebilirsin
    }
  };

  return (
    <div
      className={`bg-[#F3F5F8] w-full h-screen flex flex-col justify-center items-center dark:bg-[#2B303B] `}
    >
      <div
        className={`bg-white px-4 gap-4 py-10 max-sm:w-[90%] max-lg:w-[70%] lg:w-[40%] lg:p-12 flex flex-col items-center rounded-[12px] dark:bg-[#0E121B] dark:text-white `}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 "
        >
          <div className="flex flex-col items-center">
            <h1>Welcome to Note</h1>
            <p>Please log in to continue</p>
          </div>

          <label className="w-full flex flex-col">
            Username or Email
            <input
              {...register("usernameOrEmail", {
                required: "email Required!",
              })}
              type="text"
              className=" border p-3 rounded-[8px] "
              placeholder="email@example.com"
            />
            <p className="text-red-500">{errors.usernameOrEmail?.message}</p>
          </label>
          <label className="w-full flex flex-col">
            Password
            <input
              {...register("password", {
                required: "Password Required!",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 characters",
                },
              })}
              className=" border p-3 rounded-[8px]"
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </label>
          <button
            type="submit"
            className="w-full bg-blue-500 p-3 text-white rounded-[8px]"
          >
            Login
          </button>
          <div className="border w-full dark:border-[#232530] "></div>
        </form>
        <p>Or login with:</p>
        <button className="w-full p-3 text-black border rounded-[8px] dark:text-white">
          Google
        </button>
        <div className="border w-full dark:border-[#232530]"></div>
        <div className="flex gap-2">
          <p>No account yet?</p>
          <button onClick={() => navigate("/register")}>
            <h3>Sign up</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
