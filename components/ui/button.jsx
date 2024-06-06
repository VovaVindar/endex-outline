import * as React from "react";
import { cva } from "class-variance-authority";
import styles from "./button.module.css";

const buttonVariants = cva(
  "relative flex flex-row items-center justify-center text-mono-1 text-color-primary",
  {
    variants: {
      variant: {
        primary: `${styles["button-primary"]}`,
        form: `${styles["button-form"]}`,
        secondary: `${styles["button-secondary"]}`,
      },
      state: {
        disabled: "disabled",
        default: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      state: "default",
    },
  }
);

const Button = ({ className, variant, children, disabled, ...props }) => {
  return (
    <button
      className={buttonVariants({
        className,
        variant,
        state: disabled ? "disabled" : "default",
      })}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
