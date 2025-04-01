import { createReducer, on } from "@ngrx/store";
import { IToken } from "../core/interfaces/itoken";
import { assign } from "./token.action";

let initialState !:IToken ;


export const tokenReducer = createReducer(
    initialState,
    on(assign , (state , action) => state = action.value )
)