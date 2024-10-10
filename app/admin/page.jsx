import styles from "../src/admin.module.css";

const admin = () => {
  return (
    <>
      <title>Admin</title>
      <nav className={styles.index}>
        <li>
          <a className={styles.webicon} href="/">
            Intro
          </a>
        </li>
        <ul className={styles.gradientText}>
          <li>
            <a className={styles.channel} href="login">
              Login
            </a>
          </li>
          <br />
          <li>
            <a className={styles.channel} href="register">
              Register
            </a>
          </li>
          <br />
          <li>
            <a className={styles.channel} href="announcement">
              Announcement
            </a>
          </li>
          <br />
          <li>
            <a className={styles.channel} href="contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.account}>
        <h1>Account Management:</h1>
        &lt;% users.forEach(function(user) {"{"} %&gt; &lt;% {"}"}) %&gt;
        <table className={styles.userTable}>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Admin Status</th>
              <th>Delete</th>
              <th>Make Admin</th>
            </tr>
            <tr>
              <td>&lt;%= user.username %&gt; </td>
              <td>&lt;%= user.password %&gt;</td>
              <td>&lt;%= user.admin %&gt;</td>
              <td>
                <form
                  action="/deleteUser"
                  method="POST"
                  className={styles.deleteUsernameForm}
                >
                  <input
                    type="hidden"
                    defaultValue="<%= user.username %>"
                    name="username"
                  />
                  <button type="submit">Delete</button>
                </form>
              </td>
              <td>
                <form
                  action="/toggleAdmin"
                  method="POST"
                  className={styles.toggleAdminForm}
                >
                  <input
                    type="hidden"
                    defaultValue="<%= user.username %>"
                    name="username"
                  />
                  <button type="submit">Toggle</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <h1>Post Management:</h1>
        &lt;% posts.forEach(function(post) {"{"} %&gt; &lt;% {"}"}) %&gt;
        <table className={styles.postTable}>
          <tbody>
            <tr>
              <th>Topic</th>
              <th>Delete</th>
            </tr>
            <tr>
              <td>&lt;%= post.title %&gt;</td>
              <td>
                <form
                  action="/deletePost"
                  method="POST"
                  className={styles.deletePostForm}
                >
                  <input
                    type="hidden"
                    defaultValue="<%= post.id %>"
                    name="postId"
                  />
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </div>
      <br />
      <br />
    </>
  );
};

export default admin;
