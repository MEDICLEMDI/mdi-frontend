import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { changeDisplay } from '@/redux/slices/transaction';

const useTabDisplay = () => {
  const dispatch = useAppDispatch();

  const setDisplay = payload => {
    dispatch(changeDisplay(payload));
  };

  return { setDisplay };
};

export default useTabDisplay;
