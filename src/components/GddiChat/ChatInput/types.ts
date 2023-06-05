import React from "react";

export interface ChatInputProps {
  value: string
  onChange: React.FormEventHandler<HTMLTextAreaElement>
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onSubmit?: () => void
}
