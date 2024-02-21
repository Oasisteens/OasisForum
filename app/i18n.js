import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
          Comments: "评论",
          Refresh: "刷新",
          General: "常规",
          Post: "发布",
          Cancel: "退出",
          "Comment on this post...": "对推文评论...",
          "Comment cannot be empty": "评论不能为空",
          "Comment cannot be more than 500 words": "评论不能超过500字",
          "You must login to post": "必须登录才能发布",
          Pictures: "图片",
          Anon: "匿名",
          Delete: "删除",
          "Admin Delete": "管理员删除",
          Anonymous: "匿名",
          "Not Anonymous": "非匿名",
          Reply: "回复",
          "Comment on this...": "评论...",
          Oasis: "绿洲",
          Login: "登录",
          Register: "注册",
          News: "公告",
          Contact: "联系我们",
          "Welcome to the Oasis!": "欢迎来到绿洲！",
          "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!":
            "欢迎来到我们的论坛网站，这是一个进行讨论，与志同道合的人交流的终极平台。无论你是寻求专家建议，分享经验，还是只是想扩展你的知识，我们的论坛都提供了一个充满活力的社区，你可以在这里提问，贡献见解，并沉浸在各种话题中。加入我们，成为绿洲的一部分！",
          "About Us": "关于我们",
          "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!":
            "我们的论坛是一个以社区为驱动的平台，鼓励开放讨论，促进学习，促进尊重的互动。我们相信多元化观点的力量和建设性贡献的价值。我们的准则旨在确保每个人都能拥有一个安全和包容的互联环境。加入我们，成为绿洲的一部分！",
          "Diverse Community": "多元化社区",
          "Celebrating diversity, embracing perspectives, valuing everyone's voice":
            "庆祝多样性，拥抱观点，重视每个人的声音",
          "Engaging Discussions": "引人入胜的讨论",
          "Topics span tech, arts, sports, current events; engage with like-minded members":
            "话题涵盖技术，艺术，时事；与志同道合的成员交流",
          "Constructive Contributions": "建设性贡献",
          "Contribute insight, share experiences, foster learning in constructive discussions":
            "在建设性讨论中贡献见解，分享经验，促进学习",
          "No Spam or Self-Promotion": "禁止垃圾信息或广告推广",
          "Avoid spam, excessive self-promo; share responsibly in designated areas":
            "避免垃圾信息，过度广告推广；遵守社区准则",
          "Privacy and Confidentiality": "隐私和保密",
          "Respect privacy, do not share personal or confidential content":
            "尊重隐私，不要透露个人隐私或机密内容",
          "Reporting Issues": "举报问题",
          "Report guideline violations or issues to moderators for a safe community":
            "及时向版主举报违规行为或问题，确保社区安全",
          "For better future": "为了更美好的未来",
          "We'd love to hear from you": "我们很乐意听从你的意见",
          "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.":
            "无论你是对最新的讨论感到好奇，还是想加入特定的话题，我们的论坛网站都能满足你的需求。",
          Admin: "管理员",
          Password: "密码",
          Username: "用户名",
          Loading: "加载中",
          "Do not have an account?": "没有账号？",
          "Username has been registered": "用户名已被注册",
          "Already have an account?": "已有账号？",
          "Invalid username or password": "用户名或密码错误",
          Dashboard: "主页",
          "'s Dashboard": "的主页",
          "You have no comments yet": "你还没有评论",
          "My Comments": "我的评论",
          "My Posts": "我的帖子",
          "You have no posts yet": "你还没有帖子",
          "Liked Posts": "赞过的帖子",
          "You have no liked posts yet": "你还没有赞过的帖子",
          "Liked Comments": "赞过的评论",
          "You have no liked comments yet": "你还没有赞过的评论",
          Discussion: "讨论室",
          Confession: "告白墙",
          "Write News": "发布公告",

          Pink: "可爱粉",
          Blue: "远峰蓝",
          Purple: "高贵紫",
          Red: "活力红",
          " files has been uploaded": "个文件已上传",
          " file has been uploaded": "个文件已上传",
        },
      },
      es: {
        translation: {
          "Write sth...": "Escribe algo...",
          "Enter title (20 words max)":
            "Introduce el título (máximo 20 palabras)",
          "Write a post": "Escribe una publicación",
          "Back to Dashboard": "Volver al tablero",
          "posted by": "publicado por",
          "posted on": "publicado en",
          Comments: "Comentarios",
          Refresh: "Actualizar",
          General: "General",
          Post: "Publicar",
          Cancel: "Cancelar",
          "Comment on this post...": "Comenta en esta publicación...",
          "Comment cannot be empty": "El comentario no puede estar vacío",
          "Comment cannot be more than 500 words":
            "El comentario no puede tener más de 500 palabras",
          "You must login to post": "Debes iniciar sesión para publicar",
          Pictures: "Imágenes",
          Anon: "Anónimo",
          Delete: "Eliminar",
          "Admin Delete": "Eliminar como administrador",
          Anonymous: "Anónimo",
          "Not Anonymous": "No anónimo",
          Reply: "Responder",
          "Comment on this...": "Comenta esto...",
          Oasis: "Oasis",
          Login: "Iniciar sesión",
          Register: "Registrarse",
          News: "Noticias",
          Contact: "Contacto",
          "Welcome to the Oasis!": "¡Bienvenido al Oasis!",
          "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!":
            "Bienvenido a nuestro sitio web del foro, la plataforma definitiva para discusiones interesantes y conexión con personas de ideas afines. Ya sea que estés buscando consejos de expertos, compartiendo tus experiencias o simplemente buscando expandir tus conocimientos, nuestro foro ofrece una comunidad vibrante donde puedes hacer preguntas, contribuir con ideas y sumergirte en una amplia gama de temas. ¡Únete a nosotros y sé parte de la conversación hoy!",
          "About Us": "Sobre nosotros",
          "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!":
            "Nuestro foro es una plataforma impulsada por la comunidad que fomenta las discusiones abiertas, promueve el aprendizaje y promueve interacciones respetuosas. Creemos en el poder de las perspectivas diversas y el valor de las contribuciones constructivas. Nuestras pautas están diseñadas para garantizar un entorno seguro e inclusivo para todos. ¡Únete a nosotros y sé parte de la conversación hoy!",
          "Diverse Community": "Comunidad diversa",
          "Celebrating diversity, embracing perspectives, valuing everyone's voice":
            "Celebrando la diversidad, abrazando perspectivas, valorando la voz de todos",
          "Engaging Discussions": "Discusiones interesantes",
          "Topics span tech, arts, sports, current events; engage with like-minded members":
            "Los temas abarcan tecnología, arte, deportes, eventos actuales; interactúa con miembros de ideas afines",
          "Constructive Contributions": "Contribuciones constructivas",
          "Contribute insight, share experiences, foster learning in constructive discussions":
            "Contribuye con ideas, comparte experiencias, fomenta el aprendizaje en discusiones constructivas",
          "No Spam or Self-Promotion": "No spam o autopromoción",
          "Avoid spam, excessive self-promo; share responsibly in designated areas":
            "Evita el spam, la autopromoción excesiva; comparte de manera responsable en las áreas designadas",
          "Privacy and Confidentiality": "Privacidad y confidencialidad",
          "Respect privacy, do not share personal or confidential content":
            "Respeta la privacidad, no compartas contenido personal o confidencial",
          "Reporting Issues": "Informar de problemas",
          "Report guideline violations or issues to moderators for a safe community":
            "Informa de violaciones de las pautas o problemas a los moderadores para una comunidad segura",
          "For better future": "Para un futuro mejor",
          "We'd love to hear from you": "Nos encantaría saber de ti",
          "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.":
            "Ya sea que tengas curiosidad por las últimas discusiones o busques unirte a un tema específico, nuestro sitio web del foro te tiene cubierto.",
          Admin: "Administrador",
          Password: "Contraseña",
          Username: "Nombre de usuario",
          Loading: "Cargando",
          "Do not have an account?": "¿No tienes una cuenta?",
          "Username has been registered":
            "El nombre de usuario ya ha sido registrado",
          "Already have an account?": "¿Ya tienes una cuenta?",
          "Invalid username or password":
            "Nombre de usuario o contraseña inválidos",
          Dashboard: "Página principal",
          "'s Dashboard": "Página principal de",
          "You have no comments yet": "Aún no tienes comentarios",
          "My Comments": "Mis comentarios",
          "My Posts": "Mis publicaciones",
          "You have no posts yet": "Aún no tienes publicaciones",
          "Liked Posts": "Publicaciones que me gustan",
          "You have no liked posts yet":
            "Aún no te han gustado las publicaciones",
          "Liked Comments": "Comentarios que me gustan",
          "You have no liked comments yet":
            "Aún no te han gustado los comentarios",
          Discussion: "Discusión",
          Confession: "Confesión",
          "Write News": "Escribir noticias",
        },
      },
      fr: {
        translation: {
          "Write sth...": "Écrivez qqch...",
          "Enter title (20 words max)": "Entrez le titre (20 mots max)",
          "Write a post": "Écrivez un post",
          "Back to Dashboard": "Retour au tableau de bord",
          "posted by": "posté par",
          "posted on": "posté le",
          Comments: "Commentaires",
          Refresh: "Rafraîchir",
          General: "Général",
          Post: "Poster",
          Cancel: "Annuler",
          "Comment on this post...": "Commentez ce post...",
          "Comment cannot be empty": "Le commentaire ne peut pas être vide",
          "Comment cannot be more than 500 words":
            "Le commentaire ne peut pas dépasser 500 mots",
          "You must login to post": "Vous devez vous connecter pour poster",
          Pictures: "Images",
          Anon: "Anon",
          Delete: "Supprimer",
          "Admin Delete": "Suppression par l'admin",
          Anonymous: "Anonyme",
          "Not Anonymous": "Pas anonyme",
          Reply: "Répondre",
          "Comment on this...": "Commentez ceci...",
          Oasis: "Oasis",
          Login: "Connexion",
          Register: "S'inscrire",
          News: "Nouvelles",
          Contact: "Contact",
          "Welcome to the Oasis!": "Bienvenue à l'Oasis!",
          "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!":
            "Bienvenue sur notre site de forum, la plateforme ultime pour des discussions engageantes et pour se connecter avec des individus partageant les mêmes idées. Que vous cherchiez des conseils d'experts, que vous partagiez vos expériences ou que vous cherchiez simplement à élargir vos connaissances, notre forum offre une communauté dynamique où vous pouvez poser des questions, apporter des idées et vous immerger dans une gamme diversifiée de sujets. Rejoignez-nous et faites partie de la conversation aujourd'hui!",
          "About Us": "À propos de nous",
          "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!":
            "Notre forum est une plateforme animée par la communauté qui encourage les discussions ouvertes, favorise l'apprentissage et promeut les interactions respectueuses. Nous croyons en la puissance des perspectives diverses et la valeur des contributions constructives. Nos directives sont conçues pour assurer un environnement sûr et inclusif pour tous. Rejoignez-nous et faites partie de la conversation aujourd'hui!",
          "Diverse Community": "Communauté diversifiée",
          "Celebrating diversity, embracing perspectives, valuing everyone's voice":
            "Célébrer la diversité, embrasser les perspectives, valoriser la voix de chacun",
          "Engaging Discussions": "Discussions engageantes",
          "Topics span tech, arts, sports, current events; engage with like-minded members":
            "Les sujets couvrent la technologie, les arts, les sports, l'actualité ; engagez-vous avec des membres partageant les mêmes idées",
          "Constructive Contributions": "Contributions constructives",
          "Contribute insight, share experiences, foster learning in constructive discussions":
            "Contribuez avec des idées, partagez des expériences, favorisez l'apprentissage dans des discussions constructives",
          "No Spam or Self-Promotion": "Pas de spam ou d'auto-promotion",
          "Avoid spam, excessive self-promo; share responsibly in designated areas":
            "Évitez le spam, l'auto-promotion excessive ; partagez de manière responsable dans les zones désignées",
          "Privacy and Confidentiality": "Confidentialité et vie privée",
          "Respect privacy, do not share personal or confidential content":
            "Respectez la confidentialité, ne partagez pas de contenu personnel ou confidentiel",
          "Reporting Issues": "Signaler des problèmes",
          "Report guideline violations or issues to moderators for a safe community":
            "Signalez les violations des directives ou les problèmes aux modérateurs pour une communauté sûre",
          "For better future": "Pour un meilleur avenir",
          "We'd love to hear from you": "Nous aimerions avoir de vos nouvelles",
          "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.":
            "Que vous soyez curieux des dernières discussions ou que vous cherchiez à rejoindre un sujet spécifique, notre site de forum vous couvre.",
          Admin: "Admin",
          Password: "Mot de passe",
          Username: "Nom d'utilisateur",
          Loading: "Chargement",
          "Do not have an account?": "Vous n'avez pas de compte?",
          "Username has been registered":
            "Le nom d'utilisateur a été enregistré",
          "Already have an account?": "Vous avez déjà un compte?",
          "Invalid username or password":
            "Nom d'utilisateur ou mot de passe invalide",
          Dashboard: "Tableau de bord",
          "'s Dashboard": "Tableau de bord de",
          "You have no comments yet": "Vous n'avez pas encore de commentaires",
          "My Comments": "Mes commentaires",
          "My Posts": "Mes publications",
          "You have no posts yet": "Vous n'avez pas encore de publications",
          "Liked Posts": "Publications aimées",
          "You have no liked posts yet":
            "Vous n'avez pas encore aimé de publications",
          "Liked Comments": "Commentaires aimés",
          "You have no liked comments yet":
            "Vous n'avez pas encore aimé de commentaires",
          Discussion: "Discussion",
          Confession: "Confession",
          "Write News": "Écrire des nouvelles",
        },
      },
      ja: {
        translation: {
          "Write sth...": "何か書く...",
          "Enter title (20 words max)": "タイトルを入力（最大20語）",
          "Write a post": "投稿を書く",
          "Back to Dashboard": "ダッシュボードに戻る",
          "posted by": "投稿者：",
          "posted on": "投稿日：",
          Comments: "コメント",
          Refresh: "更新",
          General: "一般",
          Post: "投稿",
          Cancel: "キャンセル",
          "Comment on this post...": "この投稿にコメント...",
          "Comment cannot be empty": "コメントは空にできません",
          "Comment cannot be more than 500 words":
            "コメントは500語を超えることはできません",
          "You must login to post": "投稿するにはログインする必要があります",
          Pictures: "画像",
          Anon: "匿名",
          Delete: "削除",
          "Admin Delete": "管理者削除",
          Anonymous: "匿名",
          "Not Anonymous": "匿名ではない",
          Reply: "返信",
          "Comment on this...": "これにコメント...",
          Oasis: "オアシス",
          Login: "ログイン",
          Register: "登録",
          News: "ニュース",
          Contact: "お問い合わせ",
          "Welcome to the Oasis!": "オアシスへようこそ！",
          "Welcome to our forum website, the ultimate platform for engaging discussions and connecting with like-minded individuals. Whether you are seeking expert advice, sharing your experiences, or simply looking to expand your knowledge, our forum offers a vibrant community where you can ask questions, contribute insights, and immerse yourself in a diverse range of topics. Join us and be part of the conversation today!":
            "私たちのフォーラムウェブサイトへようこそ、これは議論を引き立て、同じ考えを持つ人々とつながるための究極のプラットフォームです。専門家のアドバイスを求めているのか、経験を共有しているのか、あるいは単に知識を広げたいだけなのか、私たちのフォーラムは、質問をしたり、洞察を提供したり、さまざまなトピックに没頭したりできる活気あるコミュニティを提供しています。今日私たちに参加して、会話の一部になりましょう！",
          "About Us": "私たちについて",
          "Our forum is a community-driven platform that encourages open discussions, fosters learning, and promotes respectful interactions. We believe in the power of diverse perspectives and the value of constructive contributions. Our guidelines are designed to ensure a safe and inclusive environment for everyone. Join us and be part of the conversation today!":
            "私たちのフォーラムは、オープンな議論を奨励し、学習を促進し、尊重ある交流を促進するコミュニティ主導のプラットフォームです。私たちは、多様な視点の力と建設的な貢献の価値を信じています。私たちのガイドラインは、すべての人に対して安全で包括的な環境を確保するために設計されています。今日私たちに参加して、会話の一部になりましょう！",
          "Diverse Community": "多様なコミュニティ",
          "Celebrating diversity, embracing perspectives, valuing everyone's voice":
            "多様性を祝い、視点を受け入れ、すべての人の声を尊重する",
          "Engaging Discussions": "魅力的な議論",
          "Topics span tech, arts, sports, current events; engage with like-minded members":
            "トピックはテクノロジー、芸術、スポーツ、現在のイベントに及び、同じ考えを持つメンバーと交流します",
          "Constructive Contributions": "建設的な貢献",
          "Contribute insight, share experiences, foster learning in constructive discussions":
            "洞察を提供し、経験を共有し、建設的な議論で学習を促進する",
          "No Spam or Self-Promotion": "スパムや自己宣伝は禁止",
          "Avoid spam, excessive self-promo; share responsibly in designated areas":
            "スパムや過度の自己宣伝を避け、指定されたエリアで責任を持って共有する",
          "Privacy and Confidentiality": "プライバシーと機密性",
          "Respect privacy, do not share personal or confidential content":
            "プライバシーを尊重し、個人情報や機密情報を共有しない",
          "Reporting Issues": "問題の報告",
          "Report guideline violations or issues to moderators for a safe community":
            "安全なコミュニティのために、ガイドラインの違反や問題をモデレーターに報告する",
          "For better future": "より良い未来のために",
          "We'd love to hear from you": "あなたの声を聞きたい",
          "Whether you are curious about the latest discussions or looking to join a specific topic, our forum website has got you covered.":
            "最新の議論に興味があるのか、特定のトピックに参加したいのか、私たちのフォーラムウェブサイトがあなたをサポートします。",
          Admin: "管理者",
          Password: "パスワード",
          Username: "ユーザー名",
          Loading: "読み込み中",
          "Do not have an account?": "アカウントをお持ちではありませんか？",
          "Username has been registered": "ユーザー名は既に登録されています",
          "Already have an account?": "すでにアカウントをお持ちですか？",
          "Invalid username or password": "無効なユーザー名またはパスワード",
          Dashboard: "ダッシュボード",
          "'s Dashboard": "のダッシュボード",
          "You have no comments yet": "まだコメントがありません",
          "My Comments": "私のコメント",
          "My Posts": "私の投稿",
          "You have no posts yet": "まだ投稿がありません",
          "Liked Posts": "いいねした投稿",
          "You have no liked posts yet": "まだいいねした投稿がありません",
          "Liked Comments": "いいねしたコメント",
          "You have no liked comments yet":
            "まだいいねしたコメントがありません",
          Discussion: "ディスカッション",
          Confession: "告白",
          "Write News": "ニュースを書く",
        },
      },
    },
    fallbackLng: "en", // use English as the fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
