import React, { useState } from 'react';
import { useTypedSelector }           from '../hooks/useTypedSelector';
import { /* connect,*/ useDispatch /* , useSelector */ } from 'react-redux';
import { searchRepositories }         from '../redux/actions/repositoryActions';




const RespositoriesList: React.FC<any> = (props) => {
  //////////////////////////////////////////////////////////////////////////////
  //
  //  useSelector has no idea what type of data is inside of the store.
  //  A quick fix is to use state:any.
  //
  //    const {data, error, loading } = useSelector((state:any) => state.repositoriesReducer);
  //
  //
  //  However, there is a more precise solution: https://react-redux.js.org/using-react-redux/static-typing
  //  First create a new type that describes the type of data inside of the redux store.
  //  This is done in redux/reducers/index.ts
  //
  //    export type RootState = ReturnType<typeof rootReducer>;
  //
  //
  //  Then create a useTypedSelector hook and use it instead of the useSelector hook.
  //
  //  Another alternative would be to simply use the react-redux connect() method
  //  instead of BOTH useDispatch() and useSelector(). Ultimately, that would be
  //  my preferred approach if I knew I was implementing Typescript with Redux.
  //
  //////////////////////////////////////////////////////////////////////////////


  const {data, error, loading } = useTypedSelector(state => state.repositoriesReducer);
  const dispatch                = useDispatch();
  const [term, setTerm]         = useState('');


  const searchForTerm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); //Not technically necessary since it's not in a <form>
    dispatch(searchRepositories(term));
  };


  return (
    <div className="mx-auto mb-5" style={{maxWidth: 500}}>
      <div className="input-group mb-3">
        <input
          className="form-control"
          type="text"
          placeholder="NPM Search Term..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <button className="btn btn-outline-secondary" onClick={searchForTerm}>Search</button>
      </div>


      { error && <h3 className="text-danger text-center">{ error }</h3> }

      { loading && <h3 className="text-secondary text-center">Loading...</h3> }


      { !error && !loading && (
        <ul className="mb-5">
          { data.map((item, index) => <li key={index} className="text-secondary"> { item }</li>) }
        </ul>
      )}
    </div>
  );
};


// const mapStateToProps = (state: any) => {
//   return {
//     loading: state.repositoriesReducer.loading,
//     error: state.repositoriesReducer.error,
//     data:  state.repositoriesReducer.data
//   };
// };


//export default connect(mapStateToProps, { searchRepositories })(RespositoriesList);


export default RespositoriesList;
