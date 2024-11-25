"use client"

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input, type InputProps } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { cn } from "@/_lib/utils";

const InputPass = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("password-input pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>

        {/* Esconde toggles padrões de navegadores */}
        <style jsx>{`
          .password-input::-ms-reveal,
          .password-input::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    );
  }
);

InputPass.displayName = "InputPass";

export { InputPass };