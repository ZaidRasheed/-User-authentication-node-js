# [User Authentication with node js and express](https://node-js-blog-users.herokuapp.com/)
---
<br/><br/>
Using [Start Bootstrap - Clean Blog](https://startbootstrap.com/theme/clean-blog/) as a template for the blog website I added a login, register, edit, submit and profile page as well as comments on posts page.
<br/><br/>
The users are authenticated with passport using express sessions and passwords that are hashed with bcrypt then stored on the database.
<br/><br/>
All routes are protected and can't be accessed without signing in, posting and edititng posts is restricted to admin only, a user can only delete his comments either from the post or from his profile where all his comments are shown there with the corresponding post.
<br/><br/>


EJS for templating.

MYSQL database.

---


[Blog Website](https://node-js-blog-users.herokuapp.com/)