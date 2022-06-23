import {Provider} from 'react-redux';
import configureStore from './store';

import Main from './client/pages/main';
import Result from './client/pages/result';
import Admin from './admin';
import {Routes, Route, useLocation} from 'react-router-dom';
import Groups from './admin/components/group';
import Mentors from './admin/components/mentor';
import Lessons from './admin/components/lesson';

const store = configureStore();

function App() {
  let location = useLocation();
  return (
    <Provider store={store}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/group/:id' element={ <Result key={location.pathname} queryname='group_id'/>}/>
          <Route path='/mentor/:id' element={ <Result key={location.pathname} queryname='mentor_id'/>}/>
          <Route path='/room/:id' element={<Result key={location.pathname} queryname='room_id'/>}/>
          <Route path='/admin' element={<Admin/>}>
            <Route path='mentors' element={<Mentors/>}/>
            <Route path='groups' element={<Groups/>}/>
            <Route path='lesson_in_week' element={<Lessons/>}/>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
