import type { user } from "./user.types"

export type owner ={
    user: user | null
    owner_name: string,
    image : string
    percentage : number,
    PaymentNumber : string,
    role: 'owner'
}
