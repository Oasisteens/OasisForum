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
                    "Delete": "删除",
                    "Admin Delete": "管理员删除",
                    "Anonymous": "匿名",
                    "Not Anonymous": "非匿名",
                    "Reply": "回复",
                    "Comment on this...": "评论...",
                    "Oasis": "绿洲",
                    "Login": "登录",
                    "Register": "注册",
                    "News": "公告",
                    "Contact": "联系我们",
                    "Welcome to the Oasis!": "欢迎来到绿洲！",
                    "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!": "欢迎来到我们的论坛网站，这是一个进行讨论，与志同道合的人交流的终极平台。无论你是寻求专家建议，分享经验，还是只是想扩展你的知识，我们的论坛都提供了一个充满活力的社区，你可以在这里提问，贡献见解，并沉浸在各种话题中。加入我们，成为绿洲的一部分！",
                    "About Us": "关于我们",
                    "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!": "我们的论坛是一个以社区为驱动的平台，鼓励开放讨论，促进学习，促进尊重的互动。我们相信多元化观点的力量和建设性贡献的价值。我们的准则旨在确保每个人都能拥有一个安全和包容的互联环境。加入我们，成为绿洲的一部分！",
                    "Diverse Community": "多元化社区",
                    "Celebrating diversity, embracing perspectives, valuing everyone's voice": "庆祝多样性，拥抱观点，重视每个人的声音",
                    "Engaging Discussions": "引人入胜的讨论",
                    "Topics span tech, arts, sports, current events; engage with like-minded members": "话题涵盖技术，艺术，时事；与志同道合的成员交流",
                    "Constructive Contributions": "建设性贡献",
                    "Contribute insight, share experiences, foster learning in constructive discussions": "在建设性讨论中贡献见解，分享经验，促进学习",
                    "No Spam or Self-Promotion": "禁止垃圾信息或广告推广",
                    "Avoid spam, excessive self-promo; share responsibly in designated areas": "避免垃圾信息，过度广告推广；遵守社区准则",
                    "Privacy and Confidentiality": "隐私和保密",
                    "Respect privacy, do not share personal or confidential content": "尊重隐私，不要透露个人隐私或机密内容",
                    "Reporting Issues": "举报问题",
                    "Report guideline violations or issues to moderators for a safe community": "及时向版主举报违规行为或问题，确保社区安全",
                    "For better future": "为了更美好的未来",
                    "We'd love to hear from you": "我们很乐意听从你的意见",
                    "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.": "无论你是对最新的讨论感到好奇，还是想加入特定的话题，我们的论坛网站都能满足你的需求。",
                    "Admin": "管理员",
                    "Password": "密码",
                    "Username": "用户名",
                    "Loading": "加载中",
                    "Do not have an account?": "没有账号？",
                    "Username has been registered": "用户名已被注册",
                    "Already have an account?": "已有账号？",
                    "Invalid username or password": "用户名或密码错误",
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