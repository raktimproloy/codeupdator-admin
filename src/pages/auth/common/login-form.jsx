import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { BASE_API } from "@/utils/BaseApi";
import axios from "axios";
import { useCookies } from "react-cookie";
import Spinner from "../../../components/Spinner";
import { ToastPopup } from "@/lib/ToastPopup";


const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [cookie, setCookie, removeCookie] = useCookies()
  const [showLoading, setShowLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setShowLoading(true)
    axios.post(`${BASE_API}admin-user/login`, data)
      .then(res => {
        setShowLoading(false)
        ToastPopup("success", "Login Successful!")
        setTimeout(() => {
          setCookie("_token", res.data.token)
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        setShowLoading(false)
        ToastPopup("error", "Invalid Authorization!")
      });
  };

  return (
    <>
      <Spinner showLoading={showLoading} />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="email"
          label="email"
          type="email"
          register={register}
          error={errors.email}
          className="h-[48px]"
        />
        <Textinput
          name="password"
          label="passwrod"
          type="password"
          register={register}
          error={errors.password}
          className="h-[48px]"
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          >
            Forgot Password?{" "}
          </Link>
        </div>

        <button type="submit" className="btn btn-dark block w-full text-center">Sign in</button>
      </form>
    </>
  );
};

export default LoginForm;
