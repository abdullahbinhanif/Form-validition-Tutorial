import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Login = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email == "") {
      toast.error("Email is invalid");
    } else if (password == "") {
      toast.error("Password is invalid");
    } else if (remember == "") {
      toast.error("Remember me is invalid");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Login Succesfull");
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          });
          console.log(user);
        })
        .catch((error) => {
          if (error.code == "auth/invalid-email") {
            toast.error("Email is invalid");
          } else if (error.code == "auth/invalid-credential") {
            toast.error("Your password not matching");
          } else if (error.code == "auth/too-many-requests") {
            toast.error("Your account temporarily disabled");
          } else {
            toast.error("Error:" + error.code);
          }
          console.log(error.code);
          console.log(error.message);
        });
    }
  };

  return (
    <section class="bg-gray-50 font-primary dark:bg-gray-900">
      <ToastContainer position="top-center" theme="dark" />
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <div class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    onChange={(e) => setRemember(e.target.checked)}
                    value={remember}
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                  >
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Remember me
                    </a>
                  </label>
                </div>
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Need an account?{" "}
                <Link
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  to="/signup"
                >
                  Signup here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
