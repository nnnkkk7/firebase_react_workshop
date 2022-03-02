import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import styles from "styles/pages/signup.module.scss";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "fb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

YupPassword(yup);

interface FormValue {
  email: string;
  password: string;
}
const schema = yup
  .object({
    email: yup
      .string()
      .required("必須項目です")
      .email("正しいメールアドレスを入力してください"),
    password: yup
      .string()
      .required()
      .min(8, "8文字以上で入力してください")
      .max(100, "100文字以下で入力してください")
      .minLowercase(1, "1文字以上の大文字を入れてください"),
  })
  .required();

export default function SignUp() {
  const navigate = useNavigate();
  const [serverError, setSeverError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormValue> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error.code);
        setSeverError(error.message);
      });
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          {...register("email")}
          label="メールアドレス"
          error={"email" in errors}
          helperText={errors.email?.message}
        />
        <TextField
          type="password"
          {...register("password")}
          label="パスワード"
          error={"password" in errors}
          helperText={errors.email?.message}
        />
        <Button type="submit" variant="contained">
          新規登録
        </Button>
        {serverError != null && <Typography>error</Typography>}
      </form>
    </div>
  );
}
