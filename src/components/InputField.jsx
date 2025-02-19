import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  icon,
  showIcon = false,
  onChange,
  onClickIcon,
  isPasswordField = false,
  required = false,
}) => {
  return (
    <div className="grid gap-1">
      {label && <label htmlFor={name}>{label}:</label>}
      <div className="p-2 border rounded focus-within:border-primary-200 flex items-center">
        {type !== "textarea" && (
          <>
            <input
              className=" w-full outline-none"
              type={
                !isPasswordField
                  ? type
                  : isPasswordField && showIcon
                  ? "text"
                  : type
              }
              id={name}
              name={name}
              autoFocus={name === "name"}
              placeholder={placeholder ? placeholder : `Enter ${label}`}
              value={value}
              onChange={onChange}
              required={required}
            />
            {isPasswordField && (
              <div onClick={onClickIcon} className="cursor-pointer">
                {showIcon ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            )}
          </>
        )}
        {type === "textarea" && (
          <textarea
            className="w-full outline-none resize-y"
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={3}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default InputField;
