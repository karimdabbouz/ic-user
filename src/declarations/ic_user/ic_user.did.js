export const idlFactory = ({ IDL }) => {
  const UserData = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'registeredAt' : IDL.Int,
  });
  return IDL.Service({
    'createUser' : IDL.Func([IDL.Principal, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getUserData' : IDL.Func([IDL.Principal], [IDL.Opt(UserData)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
