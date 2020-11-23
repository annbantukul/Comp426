$(function(){
    $(document).on("submit", "#signupForm", handleSignup);
});

async function handleSignup(event) {
    event.preventDefault();
    let $usernameFeild = $("#usernameFeild");
    let $passwordFeild = $("#repeatFeild");
    const username = $usernameFeild.val();
    const password = $passwordFeild.val();

    const result = await axios({
        method: 'POST',
        url: 'https://warm-oasis-53340.herokuapp.com/signup',
        withCredentials: true,
        data: {
            'user': username,
            'password': password,
        },
    });
    console.log(result);
    window.location.replace("./index.html");
}
