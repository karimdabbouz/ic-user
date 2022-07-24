import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface UserData {
  'id' : bigint,
  'name' : string,
  'description' : string,
  'registeredAt' : bigint,
}
export interface _SERVICE {
  'createUser' : ActorMethod<[Principal, string, string], bigint>,
  'getUserData' : ActorMethod<[Principal], [] | [UserData]>,
}
