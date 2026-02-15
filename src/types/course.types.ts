import type { Owner } from "./owner.types"
import type { Skill } from "./skill.types"

export type Course = {
    id : number
    name : string
    description : string
    price : number
    Image :  string
    skill : Skill
    owner : Owner
    status : boolean
}