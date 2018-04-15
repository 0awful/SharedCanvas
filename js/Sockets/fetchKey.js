import { setKeyValue } from '../actionCreators';
import { requestKey } from './sockets';
import store from '../store';

const updateKey = () => {
  console.log('updateKey called');
  const keyPromise = requestKey();
  keyPromise.then(key => {
    console.log('promise resolved');
    store.dispatch(setKeyValue(key));
  });
};

export default updateKey;
