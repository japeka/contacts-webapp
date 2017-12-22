export class Token {
    token_type: string;
    ext_expires_in: string;
    expires_on: string;
    resource: string;
    access_token: string;
    constructor(token_type?: string, ext_expires_in?: string, expires_on?: string, resource?: string, access_token?: string
      ) {
      this.token_type = token_type;
      this.ext_expires_in = ext_expires_in;
      this.expires_on = expires_on;
      this.resource = resource;
      this.access_token = access_token;
    }
  }
