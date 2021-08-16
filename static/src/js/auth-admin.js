/* 
Ce fichier ajoute une couche de vérification lors de l'authentification, en regardant si l'utilisateur a le profil Admin ou non
*/

export default async function({ $auth, redirect, store }) {
    let user = $auth.state.user;
    if (user && user.admin) {
        //Si l'utilisateur authentifié a le profil Admin

    } else {
        //Si l'utilisateur authentifié n'a pas le profil Admin
        store.dispatch('snackbar/setSnackbar', { color: 'red', text: 'Vous n\'avez pas les droits nécessaires pour consulter cette page.' });
        redirect('/');
    }
}