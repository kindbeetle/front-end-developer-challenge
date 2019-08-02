import __set from 'lodash/fp/set';
import _flow from 'lodash/flow';
import _isFunction from 'lodash/isFunction';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

/**
 * @name usePrefetch
 * @param {object[]} options
 * @param {Function: () -> Promise} options.apiCall
 * @param {Function: () -> ReduxAction} options.resolveAction
 * @return {Object} response
 */
const usePrefetch = ({ apiCall, resolveAction, rejectAction }) => {
  const [data, setData] = useState({ payload: null, error: null, isLoading: false });
  const dispatch = useDispatch();

  useEffect(() => {
    setData(__set('isLoading', true)(data));

    const call = async () => {
      try {
        const response = await apiCall();
        setData(_flow(
          __set('payload', response),
          __set('error', null),
          __set('isLoading', false)
        )(data));

        if (_isFunction(resolveAction)) {
          dispatch(resolveAction(response));
        }
      } catch (e) {
        setData(_flow(
          __set('error', e),
          __set('isLoading', false)
        )(data));

        if (_isFunction(rejectAction)) {
          dispatch(rejectAction(e));
        }
      }
    };

    call();
  }, []);

  return data;
};

export default usePrefetch;
