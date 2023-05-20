import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { supabase } from "../../utils/supabaseClient";
import { signInFormValidation } from "../../utils/signInFormValidation";
import { INITIAL_SIGN_IN_FORM_DATA } from "../../utils/constants";

type SignInProps = {};

export type signUpFormData = {
  email: string;
  password: string;
};



const SignIn: React.FC<SignInProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { formData, setFormData, handleChange } =
    useForm<signUpFormData>(INITIAL_SIGN_IN_FORM_DATA);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    setLoading(true);

    try {
      if (!signInFormValidation(formData))
        throw new Error("Invalid email or password");

      const { error } = await supabase.auth.signInWithPassword(formData);

      if (error) throw error;
    } catch (error) {
      console.log(error); // TODO: TOAST ERROR
    } finally {
      setLoading(false);
      setFormData(INITIAL_SIGN_IN_FORM_DATA);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-left">
          <h1 className="text-5xl font-bold">Sign in!</h1>
          <p className="py-6">
            To get access to the data hub, you will need to sign in.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={onSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
