let year = new Date().getFullYear().toString();
$("#year").text(year);

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function loginValidate() {
    let flag = 0;
    let email = $("input[name='email']").val();
    let password = $("input[name='password']").val();
    if (validateEmail(email) === false) {
        flag = 1;
        $("#email-error").removeClass("remove-display");
    }
    else {
        $("#email-error").addClass("remove-display");
    }
    if (password.length < 7) {
        flag = 1;
        $("#password-error").removeClass("remove-display");
    }
    else {
        $("#password-error").addClass("remove-display");
    }

    if (flag === 0) {
        return true;
    }
    else {
        return false;
    }
}
function registerValidate() {
    let flag = 0;
    let firstName = $("input[name='firstName']").val();
    let lastName = $("input[name='lastName']").val();
    let email = $("input[name='email']").val();
    let password = $("input[name='password']").val();
    if (validateEmail(email) === false) {
        flag = 1;
        $("#email-error").removeClass("remove-display");
    }
    else {
        $("#email-error").addClass("remove-display");
    }
    if (password.length < 7) {
        flag = 1;
        $("#password-error").removeClass("remove-display");
    }
    else {
        $("#password-error").addClass("remove-display");
    }
    if (firstName.length === 0) {
        flag = 1;
        $("#firstNameError").removeClass("remove-display");
    }
    else {
        $("#firstNameError").addClass("remove-display");
    }
    if (lastName.length === 0) {
        flag = 1;
        $("#lastNameError").removeClass("remove-display");
    }
    else {
        $("#lastNameError").addClass("remove-display");
    }
    if (flag === 0) {
        return true;
    }
    else {
        return false;
    }
}
$("#login").click(loginValidate);
$("#register").click(registerValidate);

$("form").on("input", () => {
    $("div.found-error").fadeTo(1000, 0);
    // addClass("remove-display");
})

$("#deletePost.redButton").click(() => {
    return confirm("Are you sure you want to delete this post?");
})