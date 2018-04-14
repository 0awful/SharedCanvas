import randomKey from '../keygen';
import { setKeyValue } from '../actionCreators';
import store from '../store';

const updateKey = () => {
  const key = randomKey();
  store.dispatch(setKeyValue(key));
};

export default updateKey;
