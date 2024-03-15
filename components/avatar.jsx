"use client";
import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import "../app/src/avatar.css";
import Shepherd from "shepherd.js";
import { useTranslation } from "react-i18next";

export default function AvatarUpload({ username, avatar, updateSession }) {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [file, setFile] = useState(null);
  const [showAvatar, setShowAvatar] = useState(true);
  const inputRef = useRef();
  const { t } = useTranslation();

  const tourInit = () => {
    if (!localStorage.getItem("Atour")) {
      localStorage.setItem("Atour", "true");
    }
    if (localStorage.getItem("Atour") === "false") {
      return;
    }
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: false,
        },
      },
      useModalOverlay: true,
    });

    tour.addSteps([
      {
        id: "step1",
        text: t("Click here to upload user image"),
        attachTo: { element: ".avatar", on: "bottom" },
        buttons: [
          {
            text: t("Back"),
            action: () => {
              tour.back();
            },
          },
          {
            text: t("Next"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("Atour", "false");
            },
          },
          {
            text: t("End"),
            action: () => {
              tour.cancel();
              const elements = document.querySelectorAll(
                '[class^="shepherd-"]',
              );
              elements.forEach((element) => element.remove());
              localStorage.setItem("Atour", "false");
            },
          },
        ],
      },
    ]);

    tour.start();
  }; //tour setting (including localStorage setting)

  useEffect(() => {
    tourInit();
  }, []); //tour initial use

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
      <div onClick={onImageClick} className="avatarContainer">
        <div className="uploadIcon">
          <img src="./camera.svg" alt="upload" width={40} height={40} />
        </div>
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
