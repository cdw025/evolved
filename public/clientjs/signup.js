$(() => {
    $('form').submit((event) => {
        event.preventDefault();
        const user = getUserFromForm();
        console.log(user);
        
        signup(user)
        .then(result => {
            console.log(result);
            window.location = `login`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
        });
    });

function signup(user) {
    return $.post(`${AUTH_URL}/signup`, user);
}

