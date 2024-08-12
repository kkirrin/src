import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { actions as pagesActions} from '@/redux/reducers/pagesReducer'
import { actions as cartActions } from '@/redux/reducers/cartReducer'
import { actions as categoryActions } from '@/redux/reducers/categoryReducer'
import { actions as productActions } from '@/redux/reducers/productReducer'

const rootActions = {
  ...pagesActions,
  ...cartActions,
  ...categoryActions,
  ...productActions,
}

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo( () => {
    return bindActionCreators(rootActions, dispatch)
  },[dispatch])

}
