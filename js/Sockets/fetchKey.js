import { setKeyValue } from '../actionCreators';
import { requestKey } from './sockets';
import store from '../store';

const updateKey = () => {
  const keyPromise = requestKey();
  keyPromise.then(key => {
    store.dispatch(setKeyValue(key));
  });
};

export default updateKey;
