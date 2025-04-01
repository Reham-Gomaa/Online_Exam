
export interface IToken {
    header: Header
    payload: Payload
  }
  
  export interface Header {
    alg: string
    typ: string
  }
  
  export interface Payload {
    id: string
    role: string
    iat: number
  }
  