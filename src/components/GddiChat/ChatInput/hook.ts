import React from "react";
import { ChatInputProps } from "./types";
import { useDebouncedCallback } from 'use-debounce'

function getDomContentWidth(dom: HTMLElement) {
  const style = window.getComputedStyle(dom);
  const paddingWidth =
    parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const width = dom.clientWidth - paddingWidth;
  return width;
}

function getOrCreateMeasureDom(id: string, init?: (dom: HTMLElement) => void) {
  let dom = document.getElementById(id);

  if (!dom) {
    dom = document.createElement("span");
    dom.style.position = "absolute";
    dom.style.wordBreak = "break-word";
    dom.style.fontSize = "14px";
    dom.style.transform = "translateY(-200vh)";
    dom.style.pointerEvents = "none";
    dom.style.opacity = "0";
    dom.id = id;
    document.body.appendChild(dom);
    init?.(dom);
  }

  return dom!;
}

function autoGrowTextArea(dom: HTMLTextAreaElement) {
  const measureDom = getOrCreateMeasureDom("__measure");
  const singleLineDom = getOrCreateMeasureDom("__single_measure", (dom) => {
    dom.innerText = "TEXT_FOR_MEASURE";
  });

  const width = getDomContentWidth(dom);
  measureDom.style.width = width + "px";
  measureDom.innerText = dom.value !== "" ? dom.value : "1";
  const endWithEmptyLine = dom.value.endsWith("\n");
  const height = parseFloat(window.getComputedStyle(measureDom).height);
  const singleLineHeight = parseFloat(
    window.getComputedStyle(singleLineDom).height,
  );

  const rows =
    Math.round(height / singleLineHeight) + (endWithEmptyLine ? 1 : 0);

  return rows;
}

export const useChatInput = ({ value, onChange, placeholder, onFocus, onBlur, onSubmit }: ChatInputProps) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const [inputRows, setInputRows] = React.useState<number>(2)

  const measuer = useDebouncedCallback(
    () => {
      const rows = inputRef.current ? autoGrowTextArea(inputRef.current) : 1;
      const inputRows = Math.min(
        20,
        Math.max(3, rows)
      )
      setInputRows(inputRows)
    },
    100,
    {
      leading: true,
      trailing: true,
    },
  )

  const onInputKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key !== "Enter") return
    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return
    e.preventDefault()
    onSubmit && onSubmit()
  }

  React.useEffect(measuer, [value])

  return {
    inputRef,
    value,
    onChange,
    placeholder,
    onFocus,
    onBlur,
    inputRows,
    onInputKeyDown,
    onSubmit,
  }
}
