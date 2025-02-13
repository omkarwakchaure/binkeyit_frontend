import React from "react";
import isAdmin from "../utils/isAdmin";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRole } from "../store/userSlice";

const AdminPermission = ({ children }) => {
  const [permission, setPermission] = useState(false);

  const navigate = useNavigate();
  const role = userRole();
  console.log(role);

  useEffect(() => {
    const hasPermission = isAdmin(role);
    setPermission(hasPermission);
    if (!hasPermission) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [role]);

  return (
    <>
      {permission ? (
        children
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <span className="text-2xl font-bold">
            You are not authorized to view this page
          </span>
        </div>
      )}
    </>
  );
};

export default AdminPermission;
