"use client";
import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { signIn } from "next-auth/react";
import axios from "axios";
import "@/app/src/avatar.css";

export default function AvatarUpload({ username, avatar }) {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [file, setFile] = useState(null);
  const [showAvatar, setShowAvatar] = useState(true); // 新的状态来控制头像的显示
  const inputRef = useRef();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
      setShowAvatar(false); // 隐藏原有的头像
    }
  };

  const onCrop = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const uploadImage = async (e) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("avatar", file, "avatar.jpg");
    await axios.post(
      `${process.env.NEXT_PUBLIC_SOURCE_URL}/avatarUpload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    signIn("credentials", { redirect: false});
    setShowAvatar(true); // 显示新的头像
    window.location.reload();
  };

  const onImageClick = () => {
    // 触发<input>元素的点击事件
    inputRef.current.click();
  };

  return (
    <div>
      {image && (
        <>
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            dragMode="move"
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <button onClick={onCrop}>Crop</button>
          <button onClick={uploadImage}>Upload</button>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
        style={{ display: "none" }}
      />
      {showAvatar && (
        <img
          src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${avatar}`}
          onClick={onImageClick} // 在图片被点击时触发<input>元素的点击事件
          className="avatar"
        />
      )}
    </div>
  );
}
