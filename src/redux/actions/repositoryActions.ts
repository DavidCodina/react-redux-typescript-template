import { RepositoryActionType as ActionType } from './types';
import axios          from 'axios';
import { Dispatch }   from 'redux';


/* =============================================================================
                           Typescript interfaces, etc.
============================================================================= */


interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORIES;
}


interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}


interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}


// Used in this file as well as in repositoriesReducer.ts
export type Action = SearchRepositoriesAction | SearchRepositoriesSuccessAction | SearchRepositoriesErrorAction;


/* =============================================================================
                             Action Creators
============================================================================= */


export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.SEARCH_REPOSITORIES });


    try {
      const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: { text: term }
      });

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    }

    catch (err){
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
