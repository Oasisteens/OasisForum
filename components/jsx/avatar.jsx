"use client";
import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import styles from "../../app/src/avatar.module.css";
import Shepherd from "shepherd.js";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function AvatarUpload({
  username,
  avatar,
  updateSession,
  auth,
}) {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const [file, setFile] = useState(null);
  const [showAvatar, setShowAvatar] = useState(true);
  const [loading, setLoading] = useState(false); //loading state for image upload
  const inputRef = useRef();
  const { t } = useTranslation();

  const tourInit = () => {
    if (!auth) return;
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
    setLoading(true);
    changeWidth("20vw");
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
          setLoading(false);
          changeWidth("8vw");
          window.location.reload();
          await updateSession(res.data.avatarUrl);
          setImage(null);
          setShowAvatar(true);
        } catch (error) {
          setLoading(false);
          changeWidth("8vw");
          console.log("Error: ", error);
          if (error.response && error.response.status === 429) {
            alert(t("Too many requests. Please try again later."));
            return;
          }
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

  const changeWidth = (width) => {
    const btn = document.getElementById("uploadBtn");
    btn.style.transition = "width 0.4s";
    btn.style.width = width;
    setTimeout(() => {
      btn.style.width;
      btn.style.transition = "width none";
    }, 500);
  };

  return (
    <div>
      {image && (
        <div className={styles.modal}>
          <Cropper
            src={image}
            style={{
              width: "40vw",
              height: "20rem",
              borderRadius: "8px",
              backgroundColor: "#eee",
              padding: "1rem",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
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
          <button
            className={styles.uploadBtn}
            id="uploadBtn"
            onClick={uploadImage}
          >
            {loading ? t("Loading...") : t("Upload")}
          </button>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        ref={inputRef}
        style={{ display: "none" }}
      />
      {auth ? (
        <div onClick={onImageClick} className={styles.avatarContainer}>
          <div className={styles.uploadIcon}>
            <Image src="/camera.svg" alt="upload" width={40} height={40} />
          </div>
          {showAvatar ? (
            <img
              src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${avatar}`}
              className={styles.avatar}
            />
          ) : (
            <Image
              priority="true"
              src="/preview.svg"
              className={styles.avatar}
              alt="avatar"
              width={110}
              height={110}
            />
          )}
        </div>
      ) : showAvatar ? (
        <img
          src={`${process.env.NEXT_PUBLIC_SOURCE_URL}/public/${avatar}`}
          className={styles.avatar}
          style={{ cursor: "default" }}
        />
      ) : (
        <img
          priority="true"
          src="./preview.svg"
          className={styles.avatar}
          alt="avatar"
          width={110}
          height={110}
          style={{ cursor: "default" }}
        />
      )}
    </div>
  );
}
