import { conf } from "../../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({ username, email, password }) {
        try {
            const user = await this.account.create({
                userId: username,
                email: email,
                password: password,
            })

            if (user) {
                this.loginUser({email,password})
            }
            else {
                return `Sorry, something went wrong please try agaian!`
            }
        }
        catch (error) {
            throw error
        }
    }

    async loginUser({ email, password }) {
        
        const result = await this.account.createEmailPasswordSession({
            email: email,
            password: password
        })

        if(result){
            return `logged In`;
        }
        else{
            return 'error occured!'
        }
    }

    async logOut(){
       try {
            await this.account.deleteSessions('current')
       } catch (error) {
          throw error
       }
    }

    async getAccount(){
        try {
             return await this.account.get()
        } catch (error) {
             throw error
        }
    
        return null

    }

}

export const authService = new AuthService;
