console.log(API_URL);

$(() => {
    $('form').submit((event) => {
        event.preventDefault();
        const user = getUserFromForm();

        login(user)
        .then(result => {
            console.log(result);
            window.location = `dashboard`;
        }).catch(error => {
            console.error(error);
            showErrorMessage(error.responseJSON.message);
        });
    });
});

function login(user) {
    return $.post(`${AUTH_URL}/login`, user);
}