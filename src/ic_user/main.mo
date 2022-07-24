import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";


actor {

  public type UserData = {
    id: Nat;
    name: Text;
    description: Text;
    registeredAt: Int;
  };


  let userDB = HashMap.HashMap<Principal, UserData>(1, Principal.equal, Principal.hash);
  private var userID : Nat = 0;


  public query func getUserData(id: Principal): async ?UserData {
    let entry = userDB.get(id);
    switch entry {
      case null {
        return null;
      };
      case (?item) {
        return ?item;
      };
    };
  };


  public shared(msg) func createUser(principal: Principal, name: Text, description: Text): async (Nat) {
    // assert (not Principal.isAnonymous(msg.caller)); 
    let user = userDB.get(principal); // User msg.caller in production!!!

    switch user {
      case null {
        let data : UserData = {
          id = userID;
          name = name;
          description = description;
          registeredAt = Time.now();
        };
        userDB.put(principal, data);
        userID += 1;
        return userID;
      };
      case (?entry) {
        let data : UserData = {
          id = entry.id;
          name = name;
          description = description;
          registeredAt = entry.registeredAt;
        };
        userDB.put(principal, data);
        userID += 1;
        return userID;
      };
    };
  };
};