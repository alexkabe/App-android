export class Users {

    user: any = {};
    constructor()
    {

    }

    addUser(user)
    {
        let tabUser = [];
        if (localStorage.getItem('Users'))
        {
            tabUser = JSON.parse(localStorage.getItem('Users'));
            tabUser = [user, ...tabUser];
        }
        else
        {
            tabUser = [user];
        }

        localStorage.setItem('Users', JSON.stringify(tabUser));
    }


}