$(function(){
    $(document).on("submit", "#loginForm", handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault();
    let $usernameFeild = $("#usernameFeild");
    let $passwordFeild = $("#passwordFeild");
    const username = $usernameFeild.val();
    const password = $passwordFeild.val();

    const result = await axios({
        method: 'POST',
        url: 'https://warm-oasis-53340.herokuapp.com/login',
        withCredentials: true,
        data: {
            'user': username,
            'password': password,
        },
    });
    console.log(result);
    window.location.replace("./index.html");
}
