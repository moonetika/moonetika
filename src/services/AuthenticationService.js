import { useAuth } from "../contexts/AuthContext";
import { authentication } from "../firebase/config";

const { loggedInUser, setLoggedInUser } = useAuth();

export const AuthenticationService = {
    loggin: function name(params) {
        ////console.log('algo' + params);
    },

    signOutUser: () => {
        signOut(authentication)
          .then((res) => {
            ////console.log("[index] logout" + res);
            setLoggedInUser(null);
          })
          .catch((err) => {
            ////console.log("[index] logout" + err);
          });
      }

}