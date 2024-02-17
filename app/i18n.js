import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Get the browser's preferred language
const browserLang = navigator.language || navigator.languages[0];

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: {
                    "Write sth...": "Write sth...",
                    // Add more key-value pairs for each text you want to translate
                },
            },
            zh: {
                translation: {
                    "Write sth...": "写点什么...",
                    "Enter title (20 words max)": "输入标题 (最多20个字)",
                    "Write a post": "写一篇文章",
                    "Back to Dashboard": "返回主页",
                    "posted by": "作者：",
                    "posted on": "发布时间：",
                    "Comments": "评论",
                    "Refresh": "刷新",
                    "General": "常规",
                    "Post": "发布",
                    "Cancel": "退出",
                    "Comment on this post...": "对推文评论...",
                    "Comment cannot be empty": "评论不能为空",
                    "Comment cannot be more than 500 words": "评论不能超过500字",
                    "You must login to post": "必须登录才能发布",
                    "Pictures": "图片",
                    "Anon": "匿名",
                },
            },
            // Add more languages here
        },
        lng: browserLang, // use the browser's preferred language
        fallbackLng: "en", // use English as the fallback language
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;