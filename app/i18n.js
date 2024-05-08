import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// i18n settings

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
          "Likes: ": "赞: ",
          "To who?": "为谁？",
          "Your nickname? (optional)": "你的署名？（可选）",
          "Your confession?": "你的告白？",
          "Express your love": "表达你的爱意",
          "from: ": "来自：",
          "Pictures or Videos (Drag and drop or Click)":
            "图片或视频（拖拽上传或点击）",
          "Username: ": "用户名：",
          "Log Out": "登出",
          "Click here to open the navigator menu": "点击这里打开导航菜单",
          "Guided Tour": "新手引导",
          Next: "下一步",
          End: "结束导览",
          Back: "上一步",
          "Go back to the intro page": "点击这里返回首页",
          "Click here to change the language": "点击这里切换语言",
          "Click here to change the color theme": "点击这里切换颜色主题",
          "Click here to upload user image": "点击这里上传用户头像",
          "Post deleted, redirecting to General...":
            "帖子已删除，正在跳转到常规...",
          " Results": "个结果",
          Filters: "筛选",
          "No Matched Results": "没有匹配的结果",
          Search: "搜索",
          Posts: "帖子",
          "Please sign in to like posts": "请登录以点赞帖子",
          "Please sign in to write a post": "请登录以发帖",
          "Please sign in to write a comment": "请登录以评论",
          "You must log in to view a specific post, redirecting to login...":
            "您必须登录才能查看特定帖子，正在重定向到登录页面...",
          "Click here to go to the search page": "点击进入搜索页面",
          "Please sign in to post": "请登录以发布",
          "Return to dashboard": "返回主页",
          Email: "邮件",
          "This page is currently under maintanance.": "此页面目前正在维护中。",
          "Forgot Password?": "忘记密码?",
          "Recover your account": "恢复您的账户",
          "through your email": "通过您的电子邮件",
          "through your username": "通过您的用户名",
          "Search your email address": "搜索您的电子邮件地址",
          "Please enter your email": "请输入您的电子邮件",
          "Email address": "电子邮件地址",
          "Your email is not registered with us. Please try again or sign up.":
            "您的电子邮件未注册。请重试或注册账号。",
          "A verification email has been sent to your email address: ":
            "验证邮件已发送至您的邮箱：",
          "LOADING...": "加载中...",
          "Please check your inbox (including the junk mails).":
            "请检查您的收件箱（包括垃圾邮件）。",
          "Please click <I'm not a robot> before sending the form":
            "请在发送表单之前点击<我不是机器人>",
          "An error occurred. Please try again later.":
            "发生错误。请稍后再试。",
          "Search your username": "搜索您的用户名",
          "Please enter your username": "请输入您的用户名",
          "User not found. Please try again or sign up.":
            "未找到用户。请重试或注册。",
          "The verification link will expire in 10 minutes.":
            "验证链接将在10分钟后过期。",
          Hi: "你好",
          "!": "！",
          "New Password": "新密码",
          "Confirm Password": "确认密码",
          "Reset Password": "重置密码",
          "Please enter your new password": "请输入您的新密码",
          "Password cannot be empty": "密码不能为空",
          "Passwords do not match": "密码不匹配",
          "Username does not match": "用户名不匹配",
          "Password updated. Please login with your new password.":
            "密码已更新。请使用新密码登录。",
          "No Special Characters": "不允许特殊字符",
          Upload: "上传",
          "Loading...": "加载中...",
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
          Pink: "Rosa",
          Blue: "Azul",
          Purple: "Púrpura",
          Red: "Rojo",
          " files has been uploaded": " archivos han sido subidos",
          " file has been uploaded": " archivo ha sido subido",
          "Likes: ": "Me gusta: ",
          "To who?": "¿A quién?",
          "Your nickname? (optional)": "¿Tu apodo? (opcional)",
          "Your confession?": "¿Tu confesión?",
          "Express your love": "Expresa tu amor",
          "from: ": "de: ",
          "Pictures or Videos (Drag and drop or Click)":
            "Imágenes o Videos (Arrastra y suelta o Haz clic)",
          "Username: ": "Nombre de usuario: ",
          "Log Out": "Cerrar sesión",
          "Click here to open the navigator menu":
            "Haz clic aquí para abrir el menú del navegador",
          "Guided Tour": "Tour guiado",
          Next: "Siguiente",
          End: "Fin",
          Back: "Atrás",
          "Go back to the intro page":
            "Haz clic aquí para volver a la página de introducción",
          "Click here to change the language":
            "Haz clic aquí para cambiar el idioma",
          "Click here to change the color theme":
            "Haz clic aquí para cambiar el tema de color",
          "Click here to upload user image":
            "Haz clic aquí para subir la imagen del usuario",
          "Post deleted, redirecting to General...":
            "Publicación eliminada, redirigiendo a General...",
          " Results": " Resultados",
          Filters: "Filtros",
          "No Matched Results": "No hay resultados coincidentes",
          Search: "Buscar",
          Posts: "Publicaciones",
          "Please sign in to like posts":
            "Por favor inicia sesión para dar me gusta a las publicaciones",
          "Please sign in to write a post":
            "Por favor inicia sesión para escribir una publicación",
          "Please sign in to write a comment":
            "Por favor inicia sesión para escribir un comentario",
          "You must log in to view a specific post, redirecting to login...":
            "Debes iniciar sesión para ver una publicación específica, redirigiendo al inicio de sesión...",
          "Click here to go to the search page":
            "Haz clic aquí para ir a la página de búsqueda",
          "Please sign in to post": "Por favor inicia sesión para publicar",
          "Return to dashboard": "Volver al tablero",
          Email: "Correo electrónico",
          "This page is currently under maintanance.":
            "Esta página está actualmente en mantenimiento.",
          "Forgot Password?": "¿Olvidaste tu contraseña?",
          "Recover your account": "Recupera tu cuenta",
          "through your email": "a través de tu correo electrónico",
          "through your username": "a través de tu nombre de usuario",
          "Search your email address":
            "Busca tu dirección de correo electrónico",
          "Please enter your email":
            "Por favor, introduce tu correo electrónico",
          "Email address": "Dirección de correo electrónico",
          "Your email is not registered with us. Please try again or sign up.":
            "Tu correo electrónico no está registrado con nosotros. Por favor, inténtalo de nuevo o regístrate.",
          "A verification email has been sent to your email address: ":
            "Se ha enviado un correo electrónico de verificación a tu dirección de correo electrónico:",
          "LOADING...": "CARGANDO...",
          "Please check your inbox (including the junk mails).":
            "Por favor, revisa tu bandeja de entrada (incluyendo los correos no deseados).",
          "Please click <I'm not a robot> before sending the form":
            "Por favor, haz clic en <No soy un robot> antes de enviar el formulario",
          "An error occurred. Please try again later.":
            "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.",
          "Search your username": "Busca tu nombre de usuario",
          "Please enter your username":
            "Por favor, introduce tu nombre de usuario",
          "User not found. Please try again or sign up.":
            "Usuario no encontrado. Por favor, inténtalo de nuevo o regístrate.",
          "The verification link will expire in 10 minutes.":
            "El enlace de verificación caducará en 10 minutos.",
          Hi: "Hola",
          "!": "!",
          "New Password": "Nueva contraseña",
          "Confirm Password": "Confirmar contraseña",
          "Reset Password": "Restablecer contraseña",
          "Please enter your new password":
            "Por favor, introduce tu nueva contraseña",
          "Password cannot be empty": "La contraseña no puede estar vacía",
          "Passwords do not match": "Las contraseñas no coinciden",
          "Username does not match": "El nombre de usuario no coincide",
          "Password updated. Please login with your new password.":
            "Contraseña actualizada. Por favor, inicia sesión con tu nueva contraseña.",
          "No Special Characters": "No se permiten caracteres especiales",
          Upload: "Subir",
          "Loading...": "Cargando...",
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
          Pink: "Rose",
          Blue: "Bleu",
          Purple: "Violet",
          Red: "Rouge",
          " files has been uploaded": " fichiers ont été téléchargés",
          " file has been uploaded": " fichier a été téléchargé",
          "Likes: ": "Aime: ",
          "To who?": "À qui?",
          "Your nickname? (optional)": "Votre surnom? (optionnel)",
          "Your confession?": "Votre confession?",
          "Express your love": "Exprimez votre amour",
          "from: ": "de: ",
          "Pictures or Videos (Drag and drop or Click)":
            "Images ou Vidéos (Glisser-déposer ou Cliquer)",
          "Username: ": "Nom d'utilisateur: ",
          "Log Out": "Se déconnecter",
          "Click here to open the navigator menu":
            "Cliquez ici pour ouvrir le menu de navigation",
          "Guided Tour": "Visite guidée",
          Next: "Suivant",
          End: "Fin",
          Back: "Retour",
          "Go back to the intro page":
            "Cliquez ici pour revenir à la page d'introduction",
          "Click here to change the language":
            "Cliquez ici pour changer la langue",
          "Click here to change the color theme":
            "Cliquez ici pour changer le thème de couleur",
          "Click here to upload user image":
            "Cliquez ici pour télécharger l'image de l'utilisateur",
          "Post deleted, redirecting to General...":
            "Poste supprimé, redirection vers Général...",
          " Results": " Résultats",
          Filters: "Filtres",
          "No Matched Results": "Aucun résultat correspondant",
          Search: "Recherche",
          Posts: "Publications",
          "Please sign in to like posts":
            "Veuillez vous connecter pour aimer les publications",
          "Please sign in to write a post":
            "Veuillez vous connecter pour écrire une publication",
          "Please sign in to write a comment":
            "Veuillez vous connecter pour écrire un commentaire",
          "You must log in to view a specific post, redirecting to login...":
            "Vous devez vous connecter pour voir une publication spécifique, redirection vers la connexion...",
          "Click here to go to the search page":
            "Cliquez ici pour aller à la page de recherche",
          "Please sign in to post": "Veuillez vous connecter pour publier",
          "Return to dashboard": "Retour au tableau de bord",
          Email: "Email",
          "This page is currently under maintanance.":
            "Cette page est actuellement en cours de maintenance.",
          "Forgot Password?": "Mot de passe oublié?",
          "Recover your account": "Récupérez votre compte",
          "through your email": "par votre email",
          "through your username": "par votre nom d'utilisateur",
          "Search your email address": "Recherchez votre adresse e-mail",
          "Please enter your email": "Veuillez entrer votre email",
          "Email address": "Adresse e-mail",
          "Your email is not registered with us. Please try again or sign up.":
            "Votre email n'est pas enregistré chez nous. Veuillez réessayer ou vous inscrire.",
          "A verification email has been sent to your email address: ":
            "Un email de vérification a été envoyé à votre adresse email:",
          "LOADING...": "CHARGEMENT...",
          "Please check your inbox (including the junk mails).":
            "Veuillez vérifier votre boîte de réception (y compris les courriers indésirables).",
          "Please click <I'm not a robot> before sending the form":
            "Veuillez cliquer sur <Je ne suis pas un robot> avant d'envoyer le formulaire",
          "An error occurred. Please try again later.":
            "Une erreur s'est produite. Veuillez réessayer plus tard.",
          "Search your username": "Recherchez votre nom d'utilisateur",
          "Please enter your username":
            "Veuillez entrer votre nom d'utilisateur",
          "User not found. Please try again or sign up.":
            "Utilisateur non trouvé. Veuillez réessayer ou vous inscrire.",
          "The verification link will expire in 10 minutes.":
            "Le lien de vérification expirera dans 10 minutes.",
          Hi: "Salut",
          "!": "!",
          "New Password": "Nouveau mot de passe",
          "Confirm Password": "Confirmer le mot de passe",
          "Reset Password": "Réinitialiser le mot de passe",
          "Please enter your new password":
            "Veuillez entrer votre nouveau mot de passe",
          "Password cannot be empty": "Le mot de passe ne peut pas être vide",
          "Passwords do not match": "Les mots de passe ne correspondent pas",
          "Username does not match": "Le nom d'utilisateur ne correspond pas",
          "Password updated. Please login with your new password.":
            "Mot de passe mis à jour. Veuillez vous connecter avec votre nouveau mot de passe.",
          "No Special Characters": "Pas de caractères spéciaux",
          Upload: "Télécharger",
          "Loading...": "Chargement...",
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
          Pink: "ピンク",
          Blue: "青",
          Purple: "紫",
          Red: "赤",
          " files has been uploaded": " ファイルがアップロードされました",
          " file has been uploaded": " ファイルがアップロードされました",
          "Likes: ": "いいね: ",
          "To who?": "誰に？",
          "Your nickname? (optional)": "あなたのニックネーム？（オプション）",
          "Your confession?": "あなたの告白？",
          "Express your love": "あなたの愛を表現する",
          "from: ": "から：",
          "Pictures or Videos (Drag and drop or Click)":
            "画像またはビデオ（ドラッグアンドドロップまたはクリック）",
          "Username: ": "ユーザー名：",
          "Log Out": "ログアウト",
          "Click here to open the navigator menu":
            "ここをクリックしてナビゲーターメニューを開く",
          "Guided Tour": "ガイド付きツアー",
          Next: "次へ",
          End: "終了",
          Back: "戻る",
          "Go back to the intro page": "ここをクリックして紹介ページに戻る",
          "Click here to change the language":
            "ここをクリックして言語を変更する",
          "Click here to change the color theme":
            "ここをクリックして色のテーマを変更する",
          "Click here to upload user image":
            "ここをクリックしてユーザー画像をアップロードする",
          "Post deleted, redirecting to General...":
            "投稿が削除され、一般にリダイレクトしています...",
          " Results": " 件の結果",
          Filters: "フィルター",
          "No Matched Results": "一致する結果がありません",
          Search: "検索",
          Posts: "投稿",
          "Please sign in to like posts":
            "投稿にいいねするにはログインしてください",
          "Please sign in to write a post":
            "投稿を書くにはログインしてください",
          "Please sign in to write a comment":
            "コメントを書くにはログインしてください",
          "You must log in to view a specific post, redirecting to login...":
            "特定の投稿を表示するにはログインする必要があります、ログインページにリダイレクトしています...",
          "Click here to go to the search page":
            "ここをクリックして検索ページに移動",
          "Please sign in to post": "投稿するにはログインしてください",
          "Return to dashboard": "ダッシュボードに戻る",
          Email: "メール",
          "This page is currently under maintanance.":
            "このページは現在メンテナンス中です。",
          "Forgot Password?": "パスワードをお忘れですか？",
          "Recover your account": "アカウントを回復する",
          "through your email": "あなたのメールを通じて",
          "through your username": "あなたのユーザー名を通じて",
          "Search your email address": "あなたのメールアドレスを検索する",
          "Please enter your email": "あなたのメールを入力してください",
          "Email address": "メールアドレス",
          "Your email is not registered with us. Please try again or sign up.":
            "あなたのメールは私たちと登録されていません。もう一度試してみてください、またはサインアップしてください。",
          "A verification email has been sent to your email address: ":
            "確認メールがあなたのメールアドレスに送信されました：",
          "LOADING...": "読み込み中...",
          "Please check your inbox (including the junk mails).":
            "あなたの受信トレイを確認してください（ジャンクメールを含む）。",
          "Please click <I'm not a robot> before sending the form":
            "フォームを送信する前に<I'm not a robot>をクリックしてください",
          "An error occurred. Please try again later.":
            "エラーが発生しました。後でもう一度お試しください。",
          "Search your username": "あなたのユーザー名を検索する",
          "Please enter your username": "あなたのユーザー名を入力してください",
          "User not found. Please try again or sign up.":
            "ユーザーが見つかりません。もう一度試してみてください、またはサインアップしてください。",
          "The verification link will expire in 10 minutes.":
            "確認リンクは10分後に期限切れになります。",
          Hi: "こんにちは",
          "!": "！",
          "New Password": "新しいパスワード",
          "Confirm Password": "パスワードを確認する",
          "Reset Password": "パスワードをリセットする",
          "Please enter your new password":
            "新しいパスワードを入力してください",
          "Password cannot be empty": "パスワードは空にできません",
          "Passwords do not match": "パスワードが一致しません",
          "Username does not match": "ユーザー名が一致しません",
          "Password updated. Please login with your new password.":
            "パスワードが更新されました。新しいパスワードでログインしてください。",
          "No Special Characters": "特殊文字は使用できません",
          Upload: "アップロード",
          "Loading...": "読み込み中...",
        },
      },
    },
    fallbackLng: "en", // use English as the fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
