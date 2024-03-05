"use client";
import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import "@/app/src/avatar.css";
import { update } from "react-spring";

export default function AvatarUpload({ username, avatar, updateSession }) {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [file, setFile] = useState(null);
  const [showAvatar, setShowAvatar] = useState(true);
  const inputRef = useRef();

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
      setShowAvatar(false);
    }
  };

  const uploadImage = async (e) => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        // Convert the Blob to a File
        const croppedFile = new File([blob], "avatar.jpg", {
          type: "image/jpeg",
        });

        const formData = new FormData();
        formData.append("username", username);
        formData.append("avatar", croppedFile);
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SOURCE_URL}/avatarUpload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );
          await updateSession(res.data.avatarUrl);
          setImage(null);
          setShowAvatar(true);
        } catch (error) {
          console.log("Error: ", error);
        }
      });
    }
  };

  const onImageClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (avatar === null || avatar === undefined) setShowAvatar(false);
    else setShowAvatar(true);
  }, []);

  return (
    <div>
      {image && (
        <>
          <div className="bg" />
          <div className="cropper">
            <Cropper
              src={image}
              initialAspectRatio={1}
              preview=".img-preview"
              guides={true}
              viewMode={1}
              dragMode="move"
              scalable={true}
              cropBoxMovable={true}
              cropBoxResizable={true}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <button className="uploadBtn" onClick={uploadImage}>
              Upload
            </button>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
        style={{ display: "none" }}
      />
      <div onClick={onImageClick}>
        {showAvatar ? (
          <img
            src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${avatar}`}
            className="avatar"
          />
        ) : (
          <img
            priority="true"
            src="./preview.svg"
            className="avatar"
            alt="avatar"
            width={110}
            height={110}
          />
        )}
      </div>
    </div>
  );
}
