import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Char "mo:base/Char";


actor {

    public type ImageGeneration = {
        prompt: Text;
        timestamp: Time.Time;
        sessionStart: Int;
        sessionEnd: Int;
        numInSession: Nat;
        imageID: Nat;
    };



    let imageGenerations = HashMap.HashMap<Principal, [ImageGeneration]>(1, Principal.equal, Principal.hash);
    private stable let fees : [Float] = [1_000, 1_500, 2_000, 2_500, 3_000, 3_000, 3_000, 3_000, 3_000];
    private stable let otps : [Text] = ["260182", "055283", "795760", "172916", "437628", "220505", "845989", "311663", "850732", "285195"];
    private var counter : Nat = 0; // Make stable in production!
    private var imageID : Nat = 0; // Make stable in production!


    public query func hello(): async Text {
      return "Hi Wichser!";
    };


};