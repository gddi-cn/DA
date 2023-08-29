import React from "react";
import { buttonGroupClasses, styled } from "@mui/material";

const DropZone = styled("div")(
  ({ theme }) => `
  background-color: ${theme.palette.mode === "dark" ? "#444" : "#f6f6f6"};
  height: 100%;
  width: 100%;
  border: 2px dashed #ccc;
  border-radius: 4px;
  -webkit-transition: border 500ms ease-out;
  -moz-transition: border 500ms ease-out;
  -o-transition: border 500ms ease-out;
  transition: border 500ms ease-out;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#999" : "#555"};
  }
`
);

const Input = styled("input")`
  display: none;
`;

const Label = styled("label")`
  height: 100%;
  width: 100%;
  text-align: center;
  color: #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-transition: color 500ms ease-out;
  -moz-transition: color 500ms ease-out;
  -o-transition: color 500ms ease-out;
  transition: color 500ms ease-out;

  &:hover {
    color: #999;
  }
  & span {
    &:first-of-type {
      font-size: 1.5em;
    }
    &:nth-of-type(2) {
      font-size: 0.8em;
    }
  }
`;

export interface DropUploadProps {
  accept?: string;
  multiple?: boolean;
  placeholder?: string;
  onChange?: (fileList: File[]) => void;
  tip?: string;
}

const DropUpload: React.FC<DropUploadProps> = ({
  accept,
  multiple = false,
  placeholder = "点击或拖拽文件到此处上传文件",
  onChange,
  tip,
}) => {
  const id = React.useId();

  return (
    <DropZone
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        onChange && onChange(files);
      }}
    >
      <Input
        id={id}
        type={"file"}
        name={"file"}
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const files = e.target.files;
          onChange && onChange(files ? Array.from(files) : []);
          (e as any).target.value = null;
        }}
      />
      <Label htmlFor={id}>
        <span>{placeholder}</span>
        {tip && <span>{tip}</span>}
      </Label>
    </DropZone>
  );
};

export default DropUpload;
