import jwtDecode from "jwt-decode";

export const rolePermitted = {
  guest: 0,
  student: 1,
  mentor: 2,
  moderator: 3,
  coordinator: 4,
  admin: 5,
};

export const canActivate = (role, token) => {
  const tokenRole = token ? jwtDecode(token).role : -1;
  return tokenRole >= role;
};
