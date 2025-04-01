import { createAction, props } from "@ngrx/store";
import { IToken } from "../core/interfaces/itoken";

export const assign = createAction(
    '[tokenReducer] Assign',
    props<{value:IToken}>()
)