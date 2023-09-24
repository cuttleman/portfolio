"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useGTM } from "@common/contexts/GTMProvider.client";

import { type IFormData, sendAction } from "../_utils/sendAction";

interface IProps {
  closeMailForm: () => void;
}

const MailForm = ({ closeMailForm }: IProps) => {
  const [isPending, startTransition] = useTransition();
  const { gtmMail } = useGTM();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      sendAction(data)
        .then((success) => {
          if (success) {
            gtmMail(data.email);
            reset();
            closeMailForm();
          }
        })
        .catch((err) => console.log("err:", err));
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="subject">Subject</label>
      <input
        id="subject"
        type="text"
        {...register("subject", { required: true, disabled: isPending })}
      />
      {errors.subject ? <span>This field is required</span> : null}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        {...register("email", { required: true, disabled: isPending })}
      />
      {errors.email ? <span>This field is required</span> : null}

      <label htmlFor="message">Message</label>
      <textarea id="message" {...register("message", { required: true, disabled: isPending })} />
      {errors.message ? <span>This field is required</span> : null}

      <button disabled={isPending} type="submit">
        {isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default MailForm;
